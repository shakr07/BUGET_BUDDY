import React from 'react'
import Chart from './Chart';

function ChartData(props) {
    
   let months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
   const Data = [
    {
      "label": `${months[(props.start + 0) % 12]}`,
      "income": props.incomeData[0],
      "Expense": props.expenseData[0]
    },
    {
      "label": `${months[(props.start + 1) % 12]}`,
      "income": props.incomeData[1],
      "Expense": props.expenseData[1]
    },
    {
      "label": `${months[(props.start + 2) % 12]}`,
      "income": props.incomeData[2],
      "Expense": props.expenseData[2]
    },
    {
      "label": `${months[(props.start + 3) % 12]}`,
      "income": props.incomeData[3],
      "Expense": props.expenseData[3]
    },
    {
      "label": `${months[(props.start + 4) % 12]}`,
      "income": props.incomeData[4],
      "Expense": props.expenseData[4]
    },
    {
      "label": `${months[(props.start + 5) % 12]}`,
      "income": props.incomeData[5],
      "Expense": props.expenseData[5]
    },
    {
      "label": `${months[(props.start + 6) % 12]}`,
      "income": props.incomeData[6],
      "Expense": props.expenseData[6]
    },
    {
      "label": `${months[(props.start + 7) % 12]}`,
      "income": props.incomeData[7],
      "Expense": props.expenseData[7]
    },
    {
      "label": `${months[(props.start + 8) % 12]}`,
      "income": props.incomeData[8],
      "Expense": props.expenseData[8]
    },
    {
      "label": `${months[(props.start + 9) % 12]}`,
      "income": props.incomeData[9],
      "Expense": props.expenseData[9]
    },
    {
      "label": `${months[(props.start + 10) % 12]}`,
      "income": props.incomeData[10],
      "Expense": props.expenseData[10]
    },
    {
      "label": `${months[(props.start + 11) % 12]}`,
      "income": props.incomeData[11],
      "Expense": props.expenseData[11]
    }
  ];

  let Source = [
    {
      "label": "Salary",
      "value": 50
    },
    {
      "label": "Tip",
      "value": 12
    },
    {
      "label": "Project",
      "value": 60
    },
    {
      "label": "Food",
      "value": 30
    },
    {
      "label": "Movie",
      "value": 15
    },
    {
      "label": "Bills",
      "value": 80
    },
    {
      "label": "Medical",
      "value": 40
    },
    {
      "label": "Fee",
      "value": 10
    },
    {
      "label": "Tax",
      "value": 20
    }
]

  
    return (
    <div>
      <Chart revenueData={Data} sourceData={Source}/>;
    </div>
  )
}

export default ChartData
