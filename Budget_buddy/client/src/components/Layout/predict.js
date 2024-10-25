import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Chart from "./Chart";
// import sourceData from "./data/sourceData.json"; // Keep sourceData if it's still needed

const   predict = () => {
  const [incomeData, setIncomeData] = useState([90000, 61200, 106300, 56400]);
  const [expenseData, setExpenseData] = useState([5000, 5200, 5300, 5400]);

  const predictFutureMonths = async (pastData, startMonthIndex, monthsToPredict) => {
    const inputs = pastData.map((_, index) => index + 1);
    const labels = pastData;

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

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
      const predictedIncome = await predictFutureMonths(incomeData, incomeData.length, 8);
      const predictedExpense = await predictFutureMonths(expenseData, expenseData.length, 8);

      setIncomeData(prev => [...prev, ...predictedIncome]);
      setExpenseData(prev => [...prev, ...predictedExpense]);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  useEffect(() => {
    trainModelsAndPredict();
  }, []);

  return (
    <Chart incomeData={incomeData} expenseData={expenseData} sourceData={sourceData} />
  );
};

export default predict;
