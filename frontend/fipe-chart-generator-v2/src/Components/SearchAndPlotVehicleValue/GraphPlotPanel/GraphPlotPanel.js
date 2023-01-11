import { React, useState, useEffect } from 'react';

import '../css/PlotPanel.css'


import { getPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import ActivityIndicator from '../../Common/ActivityIndicator';


const GraphPlotPanel = (props) => {

    useEffect(() => {
        
        if (!props.plotData){
            getPlotData(props.vehicleInfo, props.plotOptions).then((result) => props.setPlotData({
                "monthArray": result.monthArray,
                "valueArray": result.valueArray
            }));
        }
    }, [props]);

    return (
        <div className="GraphPlotPanel">
            <div className="GraphPlotPanel__Heading">
                Gráfico De Preços
            </div>
            <div className="GraphPlotPanel__Content">
                { props.plotData && 
                    <LineChart monthArray={props.plotData.monthArray} valueArray={props.plotData.valueArray} vehicleInfo={props.vehicleInfo} />
                }{
                    !props.plotData && 
                    <div className="GraphPlotPanel__Loading">
                        <ActivityIndicator />
                    </div>
                }
            </div>
        </div>
    );
}

export default GraphPlotPanel;
