import { React, useState, useEffect } from 'react';

import '../css/PlotPanel.css'


import { GetPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import ActivityIndicator from '../../Common/ActivityIndicator';


const GraphPlotPanel = (props) => {

    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        
        GetPlotData(props.vehicleInfo, props.plotOptions).then((result) => setPlotData({
            "monthArray": result.monthArray,
            "valueArray": result.valueArray
        }
    ));

    }, [props]);

    console.log("plotData", plotData);

    if (plotData) {
        return (
            <div className="GraphPlotPanel">
                <div className="GraphPlotPanel__Heading">
                    Gráfico De Preços
                </div>
                <div className="GraphPlotPanel__Content">
                    { plotData && 
                        <LineChart monthArray={plotData.monthArray} valueArray={plotData.valueArray} vehicleInfo={props.vehicleInfo} />
                    }
                </div>
            </div>
        );

    } else {
        return (
            <div className="GraphPlotPanel__Loading">
                    <ActivityIndicator />
            </div>
        );
    }
}

export default GraphPlotPanel;
