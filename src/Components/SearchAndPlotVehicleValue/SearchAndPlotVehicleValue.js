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
    return (state.plotDataArray.every((item) => item.valueArray )); 
  }, [state.plotDataArray])

  const graphPlotOptionsPanel = useRef(null);
  const graphPlotPanel = useRef(null);
  const vehicleSearchPanel = useRef(null);

  useEffect(() => {
    
    if (canGetPlotData && canPlot) {
      graphPlotPanel.current.scrollIntoView({behavior: "smooth"});
      return; 
    }

    if (canGetPlotData) {
      graphPlotOptionsPanel.current.scrollIntoView({behavior: "smooth"});
      return;
    }

    vehicleSearchPanel.current.scrollIntoView({behavior: "smooth"});

  }, [canGetPlotData, canPlot]);

  console.log("state: ", state);

  return (
    <div className="SearchAndPlotVehicleValue">
      <div className="SearchAndPlotVehicleValue__Head">
        Histórico de Preços Tabela FIPE
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
