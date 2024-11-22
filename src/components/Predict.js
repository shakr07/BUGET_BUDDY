import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import ChartData from "./ChartData";
import axios from "axios";

function Predict() {
  const [eXpense, seteXpense] = useState([]);
  const [inCome, setinCome] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchExpense = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/transections/predict-expense",
        { userid: user._id }
      );
      const data = response.data;

      let prevMonth = null;
      let count = 0;
      const newExpense = [];

      data.forEach((element) => {
        const month = new Date(element.date).getMonth();
        if (month !== prevMonth) {
          prevMonth = month;
          if (count < 3) {
            newExpense[count] = element.amount || 0;
            count++;
          }
        } else if (count <= 3) {
          newExpense[count - 1] += element.amount || 0;
        }
      });

      seteXpense(newExpense);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchIncome = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/transections/predict-income",
        { userid: user._id }
      );
      const data = response.data;

      let prevMonth = null;
      let count = 0;
      const newIncome = [];

      data.forEach((element) => {
        const month = new Date(element.date).getMonth();
        if (month !== prevMonth) {
          prevMonth = month;
          if (count < 3) {
            newIncome[count] = element.amount || 0;
            count++;
          }
        } else if (count <= 3) {
          newIncome[count - 1] += element.amount || 0;
        }
      });

      setinCome(newIncome);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const predictFutureMonths = async (pastData, startMonthIndex, monthsToPredict) => {
    const maxVal = Math.max(...pastData);
    const epsilon = 1e-5; // Small value to prevent division by zero
    const normalizedInputs = pastData.map((val) => (val + epsilon) / maxVal); 

    // Prepare inputs and labels
    const inputs = normalizedInputs.map((_, index) => index + 1);
    const labels = normalizedInputs;

    // Build an improved model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 32, activation: "relu", inputShape: [1] }));
    model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "linear" })); // Linear output layer to prevent saturation
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    // Convert data to tensors
    const xs = tf.tensor2d(inputs, [inputs.length, 1]);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    // Train the model
    await model.fit(xs, ys, {
      epochs: 200, // Increased epochs for better learning
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
        },
      },
    });

    // Generate predictions for the next months
    const predictions = [];
    for (let i = 1; i <= monthsToPredict; i++) {
      const nextMonth = startMonthIndex + i;
      const prediction = model.predict(tf.tensor2d([nextMonth], [1, 1]));
      const predictedValue = prediction.dataSync()[0] * maxVal; // Rescale the prediction back
      predictions.push(predictedValue);

      console.log(`Prediction for month ${nextMonth}: ${predictedValue}`);
    }

    return predictions;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      console.error("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      await fetchExpense(user);
      await fetchIncome(user);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const predictData = async () => {
      if (eXpense.length >= 1 && inCome.length >= 1) {
        const predictedIncome = await predictFutureMonths(
          inCome,
          inCome.length,
          12 - inCome.length
        );
        const predictedExpense = await predictFutureMonths(
          eXpense,
          eXpense.length,
          12 - eXpense.length
        );

        setIncomeData([...inCome, ...predictedIncome]);
        setExpenseData([...eXpense, ...predictedExpense]);
        setLoading(false);
      }
    };

    predictData();
  }, [eXpense, inCome]);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  return (
    <div>
      {loading ? (
        <p>Loading data and predictions...</p>
      ) : incomeData.length >= 12 && expenseData.length >= 12 ? (
        <ChartData incomeData={incomeData} expenseData={expenseData} start={month} />
      ) : (
        <p>Unable to load prediction data. Please try again later.</p>
      )}
    </div>
  );
}

export default Predict;
