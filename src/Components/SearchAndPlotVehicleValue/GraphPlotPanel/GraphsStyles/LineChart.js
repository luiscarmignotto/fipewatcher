import { React } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { convertLabelToCurrency } from './GraphPlotFormatTools';

const LineChart = ({data}) => {

  const title = "test";

  return <Line data={data} />
};

export default LineChart; 

