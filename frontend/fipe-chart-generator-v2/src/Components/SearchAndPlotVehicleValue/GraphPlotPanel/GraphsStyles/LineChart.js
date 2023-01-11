import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { convertLabelToCurrency } from './GraphPlotFormatTools';

const LineChart = (props) => {

  const title = props.vehicleInfo.manufacturer.Label + " - " + props.vehicleInfo.model.Label + " - " + props.vehicleInfo.modelYear.Label

  const displayLabel = convertLabelToCurrency(props.valueArray); 

  const data = {
    labels: props.monthArray,
    datasets: [
      {
        label: title,
        data: props.valueArray,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ],
    reponsive: true
  };

  return <Line data={data} />
};

export default LineChart; 

