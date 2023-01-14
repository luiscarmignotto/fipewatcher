import { React, useEffect } from 'react';

import '../css/PlotPanel.css'


import { getPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import ActivityIndicator from '../../Common/ActivityIndicator';
import ActionButton from '../../Common/ActionButton';


const GraphPlotPanel = (props) => {

    useEffect(() => {
        
        if (!props.plotData.valueArray){
            getPlotData(props.inputVehicleInfo, props.plotOptions).then((result) => props.setPlotData({
                "monthArray": result.monthArray,
                "valueArray": result.valueArray
            }));
        }
    }, [props]);

    return (
        <div className="GraphPlotPanel">
            <div className="GraphPlotPanel__Head">
                Gráfico De Preços
            </div>
            <div className="GraphPlotPanel__Content">
                { props.plotData.valueArray && props.plotData.monthArray &&  
                    <LineChart monthArray={props.plotData.monthArray} valueArray={props.plotData.valueArray} inputVehicleInfo={props.inputVehicleInfo} />
                }
                {
                    !props.plotData.valueArray && 
                    <div className="GraphPlotPanel__Loading">
                        <ActivityIndicator/>
                    </div>
                }
            </div>
            { props.plotData.valueArray && 
            <div className="GraphPlotPanel__Content--ActionButtonsContainer">
                <ActionButton onClick={() => { props.setPlotOptions({}) }} text="Alter Opções de Plot"/>
                <ActionButton onClick={() => { props.setPlotOptions({}); props.setInputVehicleInfo({...props.inputVehicleInfo, "searchResult": null})}} text="Alter Opções do Veículo"/>
            </div>
            }
        </div>
    );
}

export default GraphPlotPanel;
