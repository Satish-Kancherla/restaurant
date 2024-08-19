import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProjectCurveChart() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Project A',
            data: [5, 9, 8, 7, 9, 5, 4],
            fill: false,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
          {
            label: 'Project B',
            data: [4, 5, 9, 7, 6, 3, 4],
            fill: false,
            backgroundColor: 'rgba(153,102,255,1)',
            borderColor: 'rgba(153,102,255,1)',
            tension: 0.1,
          },
          {
            label: 'Project C',
            data: [3, 7, 9, 6, 7, 5, 3],
            fill: false,
            backgroundColor: 'rgba(255,159,64,1)',
            borderColor: 'rgba(255,159,64,1)',
            tension: 0.1,
          },
        ],
      };
    
      // Options for the chart
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Projects Curve',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Number of Employees Working',
            },
          },
        },
      };
    
      return <Line data={data} options={options} />;
}
