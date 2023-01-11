import { React, useState } from 'react';

import '../css/UserInputPanel.css'


import GetNumberOfMonths from './GetNumberOfMonths';
import PlotDefaults from './PlotDefaults';
import ActionButton from '../../Common/ActionButton';


const GraphPlotOptionsPanel = (props) => {

    const [numberOfMonths, setNumberOfMonths] = useState(null);
    const [wrongInputFlag, setWrongInputFlag] = useState(false);

    function generatePlotOptions() {

        if (numberOfMonths && numberOfMonths < 2) {
            setWrongInputFlag(true);
            return; 
        }

        if (props.plotData) {
            props.setPlotData(null);
        }

        const plotOptions = {
            "numberOfMonths": numberOfMonths,
            "maxDisplayedMonths": PlotDefaults().maxDisplayedMonths
        }
        setWrongInputFlag(false);
        props.setPlotOptions(plotOptions);
    }

    return (
        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Heading">Configurações do Plot</div>
            <div className="UserInputPanel__InputBoxesContainer">
                <GetNumberOfMonths setNumberOfMonths={setNumberOfMonths} />
            </div>
            { wrongInputFlag &&
                <div>O número de meses do plot deve ser maior que 1</div>
            }
            <div className="UserInputPanel__ActionButtonsContainer">
                {numberOfMonths && <ActionButton onClick={generatePlotOptions} text="Gerar Gráfico"/>}
            </div>            
            
        </div>
        
    );
}

export default GraphPlotOptionsPanel;
