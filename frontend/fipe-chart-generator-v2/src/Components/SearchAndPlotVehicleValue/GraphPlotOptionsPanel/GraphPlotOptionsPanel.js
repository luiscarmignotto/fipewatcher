import { React, useState } from 'react';
import GetNumberOfMonths from './GetNumberOfMonths';
import PlotDefaults from './PlotDefaults';
import './GraphPlotOptionsPanel.css'

const GraphPlotOptionsPanel = (props) => {

    const [numberOfMonths, setNumberOfMonths] = useState(null);

    function generatePlotOptions() {
        const plotOptions = {
            "numberOfMonths": numberOfMonths,
            "maxDisplayedMonths": PlotDefaults().maxDisplayedMonths
        }

        props.setPlotOptions(plotOptions);
    }

    return (
        <div className="GraphPlotOptionsPanel">
            <div className="GraphPlotOptionsPanelHeading">Configurações do Plot</div>
            <div className="GraphPlotOptionsPanelBoxes">
                <GetNumberOfMonths setNumberOfMonths={setNumberOfMonths} />
            </div>
            <div className="GraphPlotOptionsPanelButtons">
                {numberOfMonths && <button onClick={() => { generatePlotOptions() } }>Pesquisar</button>}
            </div>            
            
        </div>
        
    );
}

export default GraphPlotOptionsPanel;
