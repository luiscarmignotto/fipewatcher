import { useEffect, useRef, useMemo } from 'react'

import './SearchAndPlotVehicleValue.css';

import { useSearchAndPlotVehicleValueReducer } from './VehicleSearchPanel/useSearchAndPlotVehicleValueReducer';


import VehicleSearchPanel from './VehicleSearchPanel/VehicleSearchPanel';
import GraphPlotOptionsPanel from './GraphPlotOptionsPanel/GraphPlotOptionsPanel';
import GraphPlotPanel from './GraphPlotPanel/GraphPlotPanel';


function SearchAndPlotVehicleValue() {

  console.log("SearchAndPlotVehicleValue Running");

  const [state, dispatch ] = useSearchAndPlotVehicleValueReducer();

  const canGetPlotData = useMemo(() => {
    return state.inputVehicleInfoArray.every((item) => item.searchResult );
  }, [state.inputVehicleInfoArray]);

  const canPlot = useMemo(() => {

    // return (state.inputVehicleInfoArray.every((item) => item.searchResult !== null) && state.plotOptions.numberOfMonths); 
    return (state.inputVehicleInfoArray.every((item) => item.searchResult) && state.plotOptions.numberOfMonths); 
  }, [state.inputVehicleInfoArray, state.plotOptions])

  const graphPlotOptionsPanel = useRef(null);
  const graphPlotPanel = useRef(null);
  const vehicleSearchPanel = useRef(null);

  useEffect(() => {

    // if (state.plotOptions.numberOfMonths && graphPlotPanel.current) {
    //   graphPlotPanel.current.scrollIntoView( {behavior: "smooth" });
    // }
    if (canGetPlotData &&  !state.plotOptions.numberOfMonths && graphPlotOptionsPanel.current) {
        graphPlotOptionsPanel.current.scrollIntoView( {behavior: "smooth" } );
    }
    // if (!inputVehicleInfo.searchResult &&  !state.plotOptions.numberOfMonths && !plotData.valueArray && vehicleSearchPanel.current) {
    //   vehicleSearchPanel.current.scrollIntoView( {behavior: "smooth" } );
    // }
  }, [canGetPlotData, state]);

  console.log("state: ", state);

  return (
    <div className="SearchAndPlotVehicleValue">
      <div className="SearchAndPlotVehicleValue__Head">
        Histórico de Preços de Veículos - Tabela FIPE
      </div>
      <div ref={vehicleSearchPanel}>
        <VehicleSearchPanel state={state} dispatch={dispatch}/>
      </div>      
      <div ref={graphPlotOptionsPanel}>
        {canGetPlotData && 
        <GraphPlotOptionsPanel  state={state} dispatch={dispatch}/>}
      </div>
      <div ref={graphPlotPanel}>
        {canPlot && 
        <GraphPlotPanel state={state} dispatch={dispatch}/>}
      </div>
    </div>
  );
}

export default SearchAndPlotVehicleValue;
