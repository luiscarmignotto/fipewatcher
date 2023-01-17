import { React, useEffect } from 'react';

import '../css/PlotPanel.css'


import { getPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import ActivityIndicator from '../../Common/ActivityIndicator';
import ActionButton from '../../Common/ActionButton';


const GraphPlotPanel = (props) => {

    useEffect(() => {
        updatePlotData();
    }, [props.state.plotOptions]);

    async function updatePlotData(){

        const localPlotDataArray = [];

        //The x-labels will be the shortest month array

        var labels = [];
        
        for (let id=0; id < props.state.inputVehicleInfoArray.length; id++) {

            var inputVehicleInfo = props.state.inputVehicleInfoArray[id];

            // if (!props.state.plotDataArray[id]){
            console.log("Getting PlotData");
            const response = await getPlotData(inputVehicleInfo, props.state.plotOptions);

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
        
        props.setstate({
            ...props.state,
            "plotLabels": labels, 
            "plotDataArray": localPlotDataArray
        })
    }

    return (
        <div className="GraphPlotPanel">
            <div className="GraphPlotPanel__Head">
                Gráfico De Preços
            </div>
            <div className="GraphPlotPanel__Content">
                { props.state.plotDataArray.length > 0 &&  
                    <LineChart state={props.state} dataArray={props.state.plotDataArray}/>
                }
                {
                    !props.state.plotDataArray.length > 0 && 
                    <div className="GraphPlotPanel__Loading">
                        <ActivityIndicator/>
                    </div>
                }
            </div>
            { props.state.plotDataArray.length > 0 && 
            <div className="GraphPlotPanel__Content--ActionButtonsContainer">
                <ActionButton onClick={() => { props.setPlotOptions({}) }} text="Alter Opções de Plot"/>
                <ActionButton onClick={() => { props.setPlotOptions({}); props.setInputVehicleInfo({...props.inputVehicleInfo, "searchResult": null})}} text="Alter Opções do Veículo"/>
            </div>
            }
        </div>
    );
}

export default GraphPlotPanel;
