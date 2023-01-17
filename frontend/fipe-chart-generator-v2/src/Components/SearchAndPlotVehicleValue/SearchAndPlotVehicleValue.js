import { useState, useEffect, useRef, useReducer, useCallback } from 'react'

import './SearchAndPlotVehicleValue.css';

import { useSearchAndPlotVehicleValueReducer } from './VehicleSearchPanel/useSearchAndPlotVehicleValueReducer';


import VehicleSearchPanel from './VehicleSearchPanel/VehicleSearchPanel';
import GraphPlotOptionsPanel from './GraphPlotOptionsPanel/GraphPlotOptionsPanel';
import GraphPlotPanel from './GraphPlotPanel/GraphPlotPanel';


function SearchAndPlotVehicleValue() {

  console.log("SearchAndPlotVehicleValue Running");

  const [state, dispatch ] = useSearchAndPlotVehicleValueReducer();

  const [canGetPlotData, setCanGetPlotData] = useState(false);

  function resetSearchResult(){
    dispatch({
      type: 'VehicleSearchPanel',
      subtype: 'ResetVehicleSearch'
    }
    );
  }
  
  useEffect(() => {

    for (let i = 0; i < state.inputVehicleInfoArray.length; i++) {
      const inputVehicleInfo = state.inputVehicleInfoArray[i];

      if (!inputVehicleInfo.searchResult) {
        setCanGetPlotData(false);
        return;
      }
    }
    setCanGetPlotData(true);

  }, [state.inputVehicleInfoArray]);

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
        <GraphPlotOptionsPanel  state={state} dispatch={dispatch} resetSearchResult={resetSearchResult}/>}
      </div>
      {/* <div ref={graphPlotPanel}>
        {state.inputVehicleInfoArray[0].searchResult && state.plotOptions.numberOfMonths && 
        <GraphPlotPanel state={state} setstate={setstate} resetSearchResult={resetSearchResult}/>}
      </div> */}
    </div>
  );
}

export default SearchAndPlotVehicleValue;
