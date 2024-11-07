import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import ChartData from "./ChartData";

function Predict() {
  const [incomeData, setIncomeData] = useState([
    90000, 61200, 106300, 56400, 34000,
  ]);
  const [expenseData, setExpenseData] = useState([
    5000, 5200, 5300, 5400, 34000,
  ]);

  const predictFutureMonths = async (
    pastData,
    startMonthIndex,
    monthsToPredict,
  ) => {
    // console.log(startMonthIndex);
    // console.log(monthsToPredict);
    const inputs = pastData.map((_, index) => index + 1);
    const labels = pastData;

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    const xs = tf.tensor2d(inputs, [inputs.length, 1]);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    await model.fit(xs, ys, { epochs: 500 });

    const predictions = [];
    for (let i = 1; i <= monthsToPredict; i++) {
      const nextMonth = startMonthIndex + i;
      const prediction = model.predict(tf.tensor2d([nextMonth], [1, 1]));
      predictions.push(prediction.dataSync()[0]);
    }
    return predictions;
  };

  const trainModelsAndPredict = async () => {
    try {
      const provided_months_income = incomeData.length;
      const provided_months_expense = expenseData.length;

      const predictedIncome = await predictFutureMonths(
        incomeData,
        provided_months_income,
        12 - provided_months_income,
      );
      const predictedExpense = await predictFutureMonths(
        expenseData,
        provided_months_expense,
        12 - provided_months_expense,
      );

      setIncomeData((prev) => [...prev, ...predictedIncome]);
      setExpenseData((prev) => [...prev, ...predictedExpense]);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  useEffect(() => {
    trainModelsAndPredict();
  }, []);
  
  return (
    <div>
      {/* <h2>Income Data</h2>   */}
      {
        
        incomeData.length >= 12 && expenseData.length >= 12 ? <ChartData incomeData={incomeData} expenseData={expenseData} start={0} />: null
      
      }
      {/* {
        incomeData.map((value, index) => (
            <p key={index}>{value}</p> 
          ))
      }
      <h2>Expense Data</h2>
      {expenseData.map((value, index) => (
        <p key={index}>{value}</p> // Also render expense data correctly
      ))} */}
    </div>
  );
}

export default Predict;
