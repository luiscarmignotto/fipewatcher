import { React } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({data}) => {
  return <Line data={data} />
};

export default LineChart; 

