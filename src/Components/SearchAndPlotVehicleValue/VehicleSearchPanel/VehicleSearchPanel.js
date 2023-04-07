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

    async function searchButton() {

        console.log("Search Button")

        const response = await getVehicleInformation(state.inputVehicleInfoArray);

        console.log({response});

        response.forEach((item) => {
            console.log({item});
            dispatch({
                type: 'VehicleSearchPanel',
                subtype: "UpdateInputVehicleInfoInstance",
                id: item.id, 
                searchResult: {...item.result }
            })
        })
    }

    function addNewEmptySearchInstance(){
        console.log("Adding New Search Instance");
        dispatch({
            "type": "VehicleSearchPanel",
            "subtype": "AddVehicleSearchInstance"
        })
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Pesquisar Veículo</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                {inputVehicleInfoArray.map((inputVehicleInfo) => (
                    <div key={inputVehicleInfo.id}>
                       <VehicleSearchPanelInputBoxes state={state} dispatch={dispatch} id={inputVehicleInfo.id}/>
                    </div>
                ))} 
                </div>
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
    )

}

export default VehicleSearchPanel;