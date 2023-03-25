import { React, useState, useMemo } from 'react';

import '../css/UserInputPanel.css'


import GetNumberOfMonths from './GetNumberOfMonths';
import PlotDefaults from './PlotDefaults';
import ActionButton from '../../Common/ActionButton';

import ShowVehicleInformation from '../VehicleSearchPanel/ShowVehicleInformation';
import { getPlotData } from '../../../interfaces/BackendCalls';


const GraphPlotOptionsPanel = ({state, dispatch}) => {

    const [numberOfMonths, setNumberOfMonths] = useState(null);
    const wrongInputFlag = useMemo(() => {
        return numberOfMonths && numberOfMonths < 2
    }, [numberOfMonths]);

    function updatePlotOptions() {

        const plotOptions = {
            "numberOfMonths": numberOfMonths,
            "maxDisplayedMonths": PlotDefaults().maxDisplayedMonths
        }

        dispatch({
            type: 'PlotOptionsPanel',
            subtype: 'UpdatePlotOptions',
            plotOptions
        })

        getPlotData(state.inputVehicleInfoArray, plotOptions)
        .then((result) => {
            result.forEach((item) => {
                dispatch({
                    type: 'PlotPanel',
                    subtype: 'UpdatePlotDataInstance',
                    id: item.id,
                    monthArray: item.result.monthArray,
                    valueArray: item.result.valueArray
                })
            })
        })
    }

    function resetPlotOptionsAndSearchResult(){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'ResetSearchResults'
        });
        dispatch({
            type: 'PlotOptionsPanel',
            subtype: 'ResetPlotOptions'            
        })
    }

    return (
        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Configurações do Plot</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                    {state.inputVehicleInfoArray.map((item,index) => (
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
                    {numberOfMonths && <ActionButton onClick={updatePlotOptions} text="Gerar Gráfico"/>}
                    <ActionButton onClick={() => { resetPlotOptionsAndSearchResult() }} text="Alter Opções do Veículo"/>
                </div>  
            </div>    
        </div>    
    );
}

export default GraphPlotOptionsPanel;
