import React, { useMemo } from 'react';

import '../css/UserInputPanel.css'

import VehicleSearchPanelInputBoxes from './VehicleSearchPanelInputBoxes';
import ActionButton from '../../Common/ActionButton';

import { getVehicleInformation } from '../../../interfaces/BackendCalls';
import VehicleSearchPanelDefaults from './VehicleSearchPanelDefaults';

function VehicleSearchPanel({state, dispatch}) {

    const inputVehicleInfoArray = state.inputVehicleInfoArray;

    const canSearch = useMemo(() => {
        const emptyItem = inputVehicleInfoArray.some(item => {
            if (!item.vehicleType || !item.manufacturer || !item.model ||  !item.modelYear) {            
                return true;
            }
            return false; 
        })
        return !emptyItem;
    }, [inputVehicleInfoArray]);

    function resetValues() {
        
        dispatch({
            type: "General",
            subtype: 'ResetAll'
        })
    };

    function searchButton() {

        for (let i=0; i < inputVehicleInfoArray.length; i++) {
            const inputVehicleInfoInstance = inputVehicleInfoArray[i];
            console.log("searchButton i", i);
            console.log("searchButton ivi", inputVehicleInfoInstance);

            if (inputVehicleInfoInstance.vehicleType && inputVehicleInfoInstance.manufacturer && inputVehicleInfoInstance.model &&  inputVehicleInfoInstance.modelYear) {
                console.log("Getting VehicleInformation!!")
                const response = getVehicleInformation(inputVehicleInfoInstance);
                response.then((searchResult) => {
                    console.log("searchResult", searchResult);
                    dispatch({
                        "type": "VehicleSearchPanel",
                        "subtype": "UpdateInputVehicleInfoInstance",
                        "id": inputVehicleInfoInstance.id,
                        searchResult
                    })                    
                })
            } 
        }
    };

    function addNewEmptySearchInstance(){
        console.log("Adding New Search Instance");
        dispatch({
            "type": "VehicleSearchPanel",
            "subtype": "AddVehicleSearchInstance"
        })
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Consulta de Valores</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                {inputVehicleInfoArray.map((inputVehicleInfo) => (
                    <div key={inputVehicleInfo.id}>
                       <VehicleSearchPanelInputBoxes state={state} dispatch={dispatch} id={inputVehicleInfo.id}/>
                    </div>
                ))} 
                </div>

                <div className="UserInputPanel__Content--ActionButtonsContainer">
                {inputVehicleInfoArray.length < VehicleSearchPanelDefaults().MAX_SEARCH_INSTANCES &&
                    <ActionButton onClick={addNewEmptySearchInstance} text="Comparar com outro veículo"/>
                }
                {
                    <ActionButton onClick={resetValues} text="Resetar Pesquisa"/>
                }
                {canSearch && 
                    <ActionButton onClick={searchButton} text="Pesquisar"/>
                }                
                </div>                
            </div>
        </div>
    )

}

export default VehicleSearchPanel;