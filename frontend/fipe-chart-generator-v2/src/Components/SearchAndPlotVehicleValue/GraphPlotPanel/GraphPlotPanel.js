import { React, useMemo } from 'react';

import '../css/PlotPanel.css'

import LineChart from './GraphsStyles/LineChart';
import ActivityIndicator from '../../Common/ActivityIndicator';
import ActionButton from '../../Common/ActionButton';


const GraphPlotPanel = ({state, dispatch}) => {

    function convertValueArray(valueArray) {
        return valueArray.map((item) => {
          return Number(item.replace(".", "").replace(",",".").replace(/[^0-9.]/g,'')).toFixed(2);
        })
      }
    
      const dataSettings = useMemo(() => {
    
        const labelsArray = state.plotDataArray.reduce((shortestArray, {monthArray}) => {
            if (monthArray.length === 0) {
                return shortestArray; 
            }
            return monthArray.length < shortestArray.length ? monthArray : shortestArray
        }, {length: Infinity});
    
        const plotSettings = state.plotDataArray.reduce((accumulatedPlotSettings, plotDataInstance) => {
          const inputVehicleInfo = state.inputVehicleInfoArray.find((item) => item.id === plotDataInstance.id );
          return {
            labels: labelsArray,
            responsive: true,
            datasets: [
              ...accumulatedPlotSettings.datasets, 
              {
                label: inputVehicleInfo.manufacturer.Label + " - " + inputVehicleInfo.model.Label + " - " + inputVehicleInfo.modelYear.Label,
                data: convertValueArray(plotDataInstance.valueArray), 
                fill: true, 
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderColor: 'rgba(255,255,255,1)'
            }
          ]}
        }, {datasets: []});
    
        return plotSettings;
      
      }, [state]); 
      
      console.log({dataSettings});

    function resetPlotOptions(){
        dispatch({
            type: 'PlotOptionsPanel',
            subtype: 'ResetPlotOptions'
        })
    }

    function resetSearchResults(){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'ResetSearchResults'
        })
    }

    function resetPlotData() {
        dispatch({
            type: 'PlotPanel',
            subtype: 'ResetPlotData'
        })
    }

    return (
        <div className="GraphPlotPanel">
            <div className="GraphPlotPanel__Head">
                Gráfico De Preços
            </div>
            <div className="GraphPlotPanel__Content">
                { state.plotDataArray.length > 0 &&  
                    <LineChart data={dataSettings}/>
                }
                {
                    !state.plotDataArray.length > 0 && 
                    <div className="GraphPlotPanel__Loading">
                        <ActivityIndicator/>
                    </div>
                }
            </div>
            { state.plotDataArray.length > 0 && 
            <div className="GraphPlotPanel__Content--ActionButtonsContainer">
                <ActionButton onClick={() => { resetPlotOptions(); resetPlotData() }} text="Alterar Opções de Plot"/>
                <ActionButton onClick={() => { resetPlotOptions(); resetSearchResults(); resetPlotData()}} text="Alterar Opções do Veículo"/>
            </div>
            }
        </div>
    );
}

export default GraphPlotPanel;
