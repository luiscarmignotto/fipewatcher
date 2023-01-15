import { useState, useEffect, useRef } from 'react'

import './SearchAndPlotVehicleValue.css';


import VehicleSearchPanel from './VehicleSearchPanel/VehicleSearchPanel';
import GraphPlotOptionsPanel from './GraphPlotOptionsPanel/GraphPlotOptionsPanel';
import GraphPlotPanel from './GraphPlotPanel/GraphPlotPanel';

function SearchAndPlotVehicleValue() {

  // Array that contains N inputVehicleInfo objects. 

  const [searchAndPlotData, setSearchAndPlotData] = useState({
    "inputVehicleInfoArray": [{
      "id": 0
    }],
    "plotOptions": {},
    "plotDataArray": []
  });

  const [canGetPlotData, setCanGetPlotData] = useState(false);

  useEffect(() => {
    checkIfCanGetPlotData();
  }, [searchAndPlotData]);


  function resetSearchResult(){

    for (const id in searchAndPlotData.inputVehicleInfoArray) {
      const inputVehicleInfo = searchAndPlotData.inputVehicleInfoArray[id];
      setSearchAndPlotData({
        ...searchAndPlotData,
        "inputVehicleInfoArray": [
          ...searchAndPlotData.inputVehicleInfoArray,
          {...inputVehicleInfo, "searchResult": null}
        ]
      })
    }
  }

  function checkIfCanGetPlotData(){

    for (let i = 0; i < searchAndPlotData.inputVehicleInfoArray.length; i++) {
      const inputVehicleInfo = searchAndPlotData.inputVehicleInfoArray[i];

      if (inputVehicleInfo.searchResult == null) {
        setCanGetPlotData(false);
        return;
      }
    }
    setCanGetPlotData(true);
  }

  const graphPlotOptionsPanel = useRef(null);
  const graphPlotPanel = useRef(null);
  const vehicleSearchPanel = useRef(null);

  useEffect(() => {

    // if (searchAndPlotData.plotOptions.numberOfMonths && graphPlotPanel.current) {
    //   graphPlotPanel.current.scrollIntoView( {behavior: "smooth" });
    // }
    if (canGetPlotData &&  !searchAndPlotData.plotOptions.numberOfMonths && graphPlotOptionsPanel.current) {
        graphPlotOptionsPanel.current.scrollIntoView( {behavior: "smooth" } );
    }
    // if (!inputVehicleInfo.searchResult &&  !searchAndPlotData.plotOptions.numberOfMonths && !plotData.valueArray && vehicleSearchPanel.current) {
    //   vehicleSearchPanel.current.scrollIntoView( {behavior: "smooth" } );
    // }
  }, [canGetPlotData, searchAndPlotData]);

  console.log("searchAndPlotData: ", searchAndPlotData);

  return (
    <div className="SearchAndPlotVehicleValue">
      <div className="SearchAndPlotVehicleValue__Head">
        Histórico de Preços de Veículos - Tabela FIPE
      </div>
      <div ref={vehicleSearchPanel}>
        <VehicleSearchPanel searchAndPlotData={searchAndPlotData} setSearchAndPlotData={setSearchAndPlotData}/>
      </div>      
      <div ref={graphPlotOptionsPanel}>
        {canGetPlotData && 
        <GraphPlotOptionsPanel  searchAndPlotData={searchAndPlotData} setSearchAndPlotData={setSearchAndPlotData} resetSearchResult={resetSearchResult}/>}
      </div>
      {/* <div ref={graphPlotPanel}>
        {searchAndPlotData.inputVehicleInfoArray[0].searchResult && searchAndPlotData.plotOptions.numberOfMonths && 
        <GraphPlotPanel searchAndPlotData={searchAndPlotData} setSearchAndPlotData={setSearchAndPlotData} resetSearchResult={resetSearchResult}/>}
      </div> */}
    </div>
  );
}

export default SearchAndPlotVehicleValue;
