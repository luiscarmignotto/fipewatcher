import { React, useState, useEffect } from 'react';
import { GetPlotData } from '../../../interfaces/BackendCalls';
import LineChart from './GraphsStyles/LineChart';
import './GraphPlotPanel.css'
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
            <div className="GraphPlotPanelHeading">
                Gráfico De Preços
            </div>
            { plotData && 
                <LineChart className="GraphPlotPanelPlot" monthArray={plotData.monthArray} valueArray={plotData.valueArray} vehicleInfo={props.vehicleInfo} />
            }
            {!plotData && <Dots className="GraphPlotPanelPlot"/> }
        </div>
    );
}

export default GraphPlotPanel;
