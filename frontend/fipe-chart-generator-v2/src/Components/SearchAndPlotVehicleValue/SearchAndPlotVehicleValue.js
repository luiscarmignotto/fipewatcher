import { useState } from 'react'

import './SearchAndPlotVehicleValue.css';


import VehicleSearchPanel from './VehicleSearchPanel/VehicleSearchPanel';
import GraphPlotOptionsPanel from './GraphPlotOptionsPanel/GraphPlotOptionsPanel';
import GraphPlotPanel from './GraphPlotPanel/GraphPlotPanel';


function SearchAndPlotVehicleValue() {

  const [inputVehicleInfo, setInputVehicleInfo] = useState({});
  const [plotOptions, setPlotOptions] = useState(null);
  const [plotData,setPlotData] = useState(null);

  console.log("inputVehicleInfo", inputVehicleInfo);
  console.log("plotOptions", plotOptions);
  console.log("plotData", plotData);

  return (
    <div className="SearchAndPlotVehicleValue">
      <VehicleSearchPanel inputVehicleInfo={inputVehicleInfo} setInputVehicleInfo={setInputVehicleInfo} setPlotOptions={setPlotOptions}/>
      {inputVehicleInfo.searchResult && <GraphPlotOptionsPanel plotOptions={plotOptions} setPlotOptions={setPlotOptions} plotData={plotData} setPlotData={setPlotData}/>}
      {inputVehicleInfo.searchResult && plotOptions && <GraphPlotPanel vehicleInfo={inputVehicleInfo} plotOptions={plotOptions} plotData={plotData} setPlotData={setPlotData}/>}
    </div>
  );
}

export default SearchAndPlotVehicleValue;
