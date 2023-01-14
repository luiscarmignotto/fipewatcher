import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { convertLabelToCurrency } from './GraphPlotFormatTools';

const LineChart = (props) => {

  const title = props.inputVehicleInfo.manufacturer.Label + " - " + props.inputVehicleInfo.model.Label + " - " + props.inputVehicleInfo.modelYear.Label

  const displayLabel = convertLabelToCurrency(props.valueArray); 

  const data = {
    labels: props.monthArray,
    datasets: [
      {
        label: title,
        data: props.valueArray,
        fill: true,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderColor: 'rgba(255,255,255,1)',    
      }
    ],
    reponsive: true
  };

  return <Line data={data} />
};

export default LineChart; 

