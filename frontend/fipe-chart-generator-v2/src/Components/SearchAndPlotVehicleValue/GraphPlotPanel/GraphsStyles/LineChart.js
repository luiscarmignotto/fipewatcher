import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { convertLabelToCurrency } from './GraphPlotFormatTools';

const LineChart = (props) => {


  // const title = props.inputVehicleInfo.manufacturer.Label + " - " + props.inputVehicleInfo.model.Label + " - " + props.inputVehicleInfo.modelYear.Label;
  const title = "test";

  // const displayLabel = convertLabelToCurrency(props.valueArray); 

  const data = {
    labels: props.searchAndPlotData.plotLabels,
    datasets: props.dataArray.map((item, index) => (
      {
        "label": item.vehicleInfo.manufacturer.Label + " - " + item.vehicleInfo.model.Label + " - " + item.vehicleInfo.modelYear.Label,
        "data": item.valueArray,
        "fill": true,
        "backgroundColor": 'rgba(0,0,0,0.2)',
        "borderColor": 'rgba(255,255,255,1)',    
      }
    )),
    reponsive: true
  };

  return <Line data={data} />
};

export default LineChart; 

