import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";

// Set default chart options
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Chart({ revenueData = [], sourceData = [], start }) {
    // Check if revenueData and sourceData are defined
    console.log(revenueData, " ", sourceData);
    if (!revenueData.length || !sourceData.length) {
        return <div>Loading data...</div>;
    }

    // Ensure positive values for revenueData (Income and Expense)
    const positiveRevenueData = revenueData.map((data) => ({
        ...data,
        income: Math.abs(data.income), // Ensure positive Income
        Expense: Math.abs(data.Expense), // Ensure positive Expense
    }));

    // Ensure positive values for sourceData (Count values)
    const positiveSourceData = sourceData.map((data) => ({
        ...data,
        value: Math.abs(data.value), // Ensure positive value for Count
    }));

    return (
        <>
            {/* Monthly Income & Expense Chart */}
            <div className="dataCard revenueCard" style={styles.card}>
                <Line
                    data={{
                        labels: positiveRevenueData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Income",
                                data: positiveRevenueData.map((data) => data.income),
                                backgroundColor: "#064FF0",
                                borderColor: "#064FF0",
                            },
                            {
                                label: "Expense",
                                data: positiveRevenueData.map((data) => data.Expense),
                                backgroundColor: "#FF3030",
                                borderColor: "#FF3030",
                            },
                        ],
                    }}
                    options={{
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

            {/* Revenue Source Bar Chart */}
            <div className="dataCard customerCard" style={styles.card}>
                <Bar
                    data={{
                        labels: positiveSourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Count",
                                data: positiveSourceData.map((data) => data.value),
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

            {/* Revenue Source Doughnut Chart */}
            <div className="dataCard categoryCard" style={styles.card}>
                <Doughnut
                    data={{
                        labels: positiveSourceData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Count",
                                data: positiveSourceData.map((data) => data.value),
                                backgroundColor: positiveSourceData.map((data, index) => {
                                    // Define an array of 9 colors
                                    const colors = [
                                        "rgba(43, 63, 229, 0.8)",  // blue
                                        "rgba(250, 192, 19, 0.8)",  // yellow
                                        "rgba(253, 135, 135, 0.8)", // red
                                        "rgba(0, 204, 102, 0.8)",   // green
                                        "rgba(153, 102, 255, 0.8)", // purple
                                        "rgba(255, 159, 64, 0.8)",  // orange
                                        "rgba(54, 162, 235, 0.8)",  // light blue
                                        "rgba(201, 203, 207, 0.8)", // gray
                                        "rgba(75, 192, 192, 0.8)"   // teal
                                    ];
                                    return colors[index % colors.length];
                                }),
                                borderColor: positiveSourceData.map((data, index) => {
                                    const colors = [
                                        "rgba(43, 63, 229, 1)",
                                        "rgba(250, 192, 19, 1)",
                                        "rgba(253, 135, 135, 1)",
                                        "rgba(0, 204, 102, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(201, 203, 207, 1)",
                                        "rgba(75, 192, 192, 1)"
                                    ];
                                    return colors[index % colors.length];
                                }),
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
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
}

const styles = {
    card: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "1px solid #ddd",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "30px",
        padding: "20px",
        textAlign: "center",
    },
};

export default Chart;
