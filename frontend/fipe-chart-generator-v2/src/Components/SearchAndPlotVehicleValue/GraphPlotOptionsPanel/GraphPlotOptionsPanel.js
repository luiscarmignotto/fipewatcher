import { React, useState } from 'react';

import '../css/UserInputPanel.css'


import GetNumberOfMonths from './GetNumberOfMonths';
import PlotDefaults from './PlotDefaults';
import ActionButton from '../../Common/ActionButton';

import ShowVehicleInformation from '../VehicleSearchPanel/ShowVehicleInformation';


const GraphPlotOptionsPanel = (props) => {

    const [numberOfMonths, setNumberOfMonths] = useState(null);
    const [wrongInputFlag, setWrongInputFlag] = useState(false);

    function setPlotOptions(value) {
        props.setSearchAndPlotData({
          ...props.searchAndPlotData,
          "plotOptions": value
        })
    };

    function generatePlotOptions() {

        if (numberOfMonths && numberOfMonths < 2) {
            setWrongInputFlag(true);
            return; 
        }

        if (props.searchAndPlotData.plotDataArray) {
            // props.setPlotData([]);
        }

        const plotOptions = {
            "numberOfMonths": numberOfMonths,
            "maxDisplayedMonths": PlotDefaults().maxDisplayedMonths
        }

        setWrongInputFlag(false);
        setPlotOptions(plotOptions);
    }

    return (
        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Configurações do Plot</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                    {props.searchAndPlotData.inputVehicleInfoArray.map((item,index) => (
                        <ShowVehicleInformation key={index} inputVehicleInfo={item} />  
                    ))}
                </div>

                <div className="UserInputPanel__Content--InputBoxesContainer">
                    <GetNumberOfMonths setNumberOfMonths={setNumberOfMonths} />
                    { wrongInputFlag &&
                    <div>O número de meses do plot deve ser maior que 1</div>
                    }
                </div>
                <div className="UserInputPanel__Content--ActionButtonsContainer">
                    {numberOfMonths && <ActionButton onClick={generatePlotOptions} text="Gerar Gráfico"/>}
                    <ActionButton onClick={() => { setPlotOptions({}); props.resetSearchResult() }} text="Alter Opções do Veículo"/>
                </div>  
            </div>    
        </div>    
    );
}

export default GraphPlotOptionsPanel;
