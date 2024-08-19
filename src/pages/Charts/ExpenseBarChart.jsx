import React from 'react'
import { Bar } from "react-chartjs-2";

import { Chart,LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip } from "chart.js";
Chart.register(
  LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip
)
const labels=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const options={
  plugins:{
    legend:{
      position:"top",
    },
    title:{
      display:true,
      text:"Expense Tracker"
    }
  }
}
const data={
  labels,
  datasets:[
    {
      label:"2022 Expenses",
      data:[10000,9000,8000,10500,10200,8400,13000,8900,14600,17000,9000,12500],
      backgroundColor:"#225FB1"
    },
    {
      label:"2023 Expenses",
      data:[17000,11000,12500,11000,12100,7500,13800,8100,9600,10000,11000,8000],
      backgroundColor:"#B6EA5F"
    }
  ]
}
export default function ExpenseBarChart() {
  return (
    <>
        <Bar options={options} data={data}/>
    </>
  )
}
