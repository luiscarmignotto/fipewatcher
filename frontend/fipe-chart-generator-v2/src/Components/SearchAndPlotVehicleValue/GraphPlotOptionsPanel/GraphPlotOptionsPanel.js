import { React, useState } from 'react';

import '../css/UserInputPanel.css'


import GetNumberOfMonths from './GetNumberOfMonths';
import PlotDefaults from './PlotDefaults';
import ActionButton from '../../Common/ActionButton';

import ShowVehicleInformation from '../VehicleSearchPanel/ShowVehicleInformation';


const GraphPlotOptionsPanel = (props) => {

    const [numberOfMonths, setNumberOfMonths] = useState(null);
    const [wrongInputFlag, setWrongInputFlag] = useState(false);

    function generatePlotOptions() {

        if (numberOfMonths && numberOfMonths < 2) {
            setWrongInputFlag(true);
            return; 
        }

        if (props.plotData) {
            props.setPlotData({});
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
            <div className="UserInputPanel__Head">Configurações do Plot</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--DisplayInfo">
                    <ShowVehicleInformation inputVehicleInfo={props.inputVehicleInfo} setInputVehicleInfo={props.setInputVehicleInfo} />              
                </div>
                <div className="UserInputPanel__Content--InputBoxesContainer">
                    <GetNumberOfMonths setNumberOfMonths={setNumberOfMonths} />
                    { wrongInputFlag &&
                    <div>O número de meses do plot deve ser maior que 1</div>
                    }
                </div>
                <div className="UserInputPanel__Content--ActionButtonsContainer">
                    {numberOfMonths && <ActionButton onClick={generatePlotOptions} text="Gerar Gráfico"/>}
                    <ActionButton onClick={() => { props.setPlotOptions({}); props.setInputVehicleInfo({...props.inputVehicleInfo, "searchResult": null})}} text="Alter Opções do Veículo"/>
                </div>  
            </div>    
        </div>    
    );
}

export default GraphPlotOptionsPanel;
