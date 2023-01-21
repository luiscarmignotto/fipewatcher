import { React, useEffect } from 'react';

import '../css/PlotPanel.css'


import { getPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import ActivityIndicator from '../../Common/ActivityIndicator';
import ActionButton from '../../Common/ActionButton';


const GraphPlotPanel = ({state, dispatch}) => {

    useEffect(() => {
        updatePlotData();
    }, [state.plotOptions]);

    async function updatePlotData(){

        const localPlotDataArray = [];

        //The x-labels will be the shortest month array

        var labels = [];
        
        for (let id=0; id < state.inputVehicleInfoArray.length; id++) {

            var inputVehicleInfo = state.inputVehicleInfoArray[id];

            // if (!state.plotDataArray[id]){
            console.log("Getting PlotData");
            const response = await getPlotData(inputVehicleInfo, state.plotOptions);

            if (response.valueArray.length > 0) {
                if (labels.length > 0) {
                    if (response.monthArray.length < labels.length) {
                        labels = response.monthArray;
                    }
                } else {
                    labels = response.monthArray;
                }
            }

            localPlotDataArray.push(response);
            // }
        } 


        dispatch({
            type: 'PlotPanel',
            subtype: 'UpdatePlotData',
            plotDataArray: localPlotDataArray,
            plotDataLabels: labels
        })
        
    }

    function resetPlotOptions(){
        dispatch({
            type: 'PlotOptionsPanel',
            subtype: 'ResetPlotOptions'
        })
    }

    function resetSearchResults(){
        dispatch({
            type: 'VehicleInfoPanel',
            subtype: 'ResetSearchResults'
        })
    }

    return (
        <div className="GraphPlotPanel">
            <div className="GraphPlotPanel__Head">
                Gráfico De Preços
            </div>
            <div className="GraphPlotPanel__Content">
                { state.plotDataArray.length > 0 &&  
                    <LineChart state={state} dataArray={state.plotDataArray}/>
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
                <ActionButton onClick={() => { resetPlotOptions({}) }} text="Alter Opções de Plot"/>
                <ActionButton onClick={() => { resetPlotOptions(); resetSearchResults()}} text="Alter Opções do Veículo"/>
            </div>
            }
        </div>
    );
}

export default GraphPlotPanel;
