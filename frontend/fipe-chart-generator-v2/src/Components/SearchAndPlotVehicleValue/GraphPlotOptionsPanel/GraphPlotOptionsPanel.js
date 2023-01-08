import { React, useState } from 'react';
import GetNumberOfMonths from './GetNumberOfMonths';
import PlotDefaults from './PlotDefaults';
// import './GraphPlotOptionsPanel.css'
import '../css/UserInputPanel.css'

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
        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Heading">Configurações do Plot</div>
            <div className="UserInputPanel__InputBoxesContainer">
                <GetNumberOfMonths setNumberOfMonths={setNumberOfMonths} />
            </div>
            <div className="UserInputPanel__ActionButtonsContainer">
                {numberOfMonths && <button onClick={() => { generatePlotOptions() } }>Pesquisar</button>}
            </div>            
            
        </div>
        
    );
}

export default GraphPlotOptionsPanel;
