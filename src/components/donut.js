import React from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart({ data }) {
  return <Doughnut data={data} />;
}
