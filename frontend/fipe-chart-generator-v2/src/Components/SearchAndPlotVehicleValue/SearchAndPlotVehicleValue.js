import { useState, useEffect, useRef } from 'react'

import './SearchAndPlotVehicleValue.css';


import VehicleSearchPanel from './VehicleSearchPanel/VehicleSearchPanel';
import GraphPlotOptionsPanel from './GraphPlotOptionsPanel/GraphPlotOptionsPanel';
import GraphPlotPanel from './GraphPlotPanel/GraphPlotPanel';

function SearchAndPlotVehicleValue() {

  const [inputVehicleInfo, setInputVehicleInfo] = useState({});
  const [plotOptions, setPlotOptions] = useState({});
  const [plotData,setPlotData] = useState({});

  const graphPlotOptionsPanel = useRef(null);
  const graphPlotPanel = useRef(null);
  const vehicleSearchPanel = useRef(null);

  useEffect(() => {

    if (plotOptions.numberOfMonths && graphPlotPanel.current) {
      graphPlotPanel.current.scrollIntoView( {behavior: "smooth" });
    }
    if (inputVehicleInfo.searchResult &&  !plotOptions.numberOfMonths && graphPlotOptionsPanel.current) {
        graphPlotOptionsPanel.current.scrollIntoView( {behavior: "smooth" } );
    }
    if (!inputVehicleInfo.searchResult &&  !plotOptions.numberOfMonths && !plotData.valueArray && vehicleSearchPanel.current) {
      vehicleSearchPanel.current.scrollIntoView( {behavior: "smooth" } );
    }
  }, [inputVehicleInfo, plotOptions, plotData]);

  console.log("inputVehicleInfo", inputVehicleInfo);
  console.log("plotOptions", plotOptions);
  console.log("plotData", plotData);

  return (
    <div className="SearchAndPlotVehicleValue">
      <div className="SearchAndPlotVehicleValue__Head">
        Histórico de Preços de Veículos - Tabela FIPE
      </div>
      <div ref={vehicleSearchPanel}>
        <VehicleSearchPanel inputVehicleInfo={inputVehicleInfo} setInputVehicleInfo={setInputVehicleInfo} setPlotOptions={setPlotOptions}/>
      </div>      
      <div ref={graphPlotOptionsPanel}>
        {inputVehicleInfo.searchResult && <GraphPlotOptionsPanel  plotOptions={plotOptions} setPlotOptions={setPlotOptions} plotData={plotData} setPlotData={setPlotData} inputVehicleInfo={inputVehicleInfo} setInputVehicleInfo={setInputVehicleInfo}/>}
      </div>
      <div ref={graphPlotPanel}>
        {inputVehicleInfo.searchResult && plotOptions.numberOfMonths && <GraphPlotPanel inputVehicleInfo={inputVehicleInfo} setInputVehicleInfo={setInputVehicleInfo} plotOptions={plotOptions} setPlotOptions={setPlotOptions} plotData={plotData} setPlotData={setPlotData}/>}
      </div>
    </div>
  );
}

export default SearchAndPlotVehicleValue;
