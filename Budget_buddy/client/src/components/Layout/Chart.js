// Chart.js
import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Chart = ({ incomeData, expenseData, sourceData }) => {
  return (
    <>
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: incomeData.map((_, index) => `Month ${index + 1}`), // Adjust labels if needed
            datasets: [
              {
                label: "Income",
                data: incomeData,
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "Expense",
                data: expenseData,
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Income & Expense",
              },
            },
          }}
          height={300}
          width={600}
        />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
          height={300}
          width={600}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                text: "Revenue Sources",
              },
            },
          }}
          height={300}
          width={600}
        />
      </div>
    </>
  );
};

export default Chart;
