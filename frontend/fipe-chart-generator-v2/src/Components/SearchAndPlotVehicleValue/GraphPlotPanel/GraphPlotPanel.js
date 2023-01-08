import { React, useState, useEffect } from 'react';
import { GetPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import '../css/PlotPanel.css'
import { Dots } from "react-activity";
import "react-activity/dist/library.css";


const GraphPlotPanel = (props) => {

    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        
        GetPlotData(props.vehicleInfo, props.plotOptions).then((result) => setPlotData({
            "monthArray": result.monthArray,
            "valueArray": result.valueArray
        }));

    }, [props]);

    console.log("plotData", plotData);

    return (
        <div className="GraphPlotPanel">
            <div className="GraphPlotPanel__Heading">
                Gráfico De Preços
            </div>
            <div className="GraphPlotPanel__Content">
                { plotData && 
                    <LineChart monthArray={plotData.monthArray} valueArray={plotData.valueArray} vehicleInfo={props.vehicleInfo} />
                }
                {!plotData && <Dots/>}
            </div>
        </div>
    );
}

export default GraphPlotPanel;
