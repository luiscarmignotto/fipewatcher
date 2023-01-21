import React, { useMemo } from 'react';

import '../css/UserInputPanel.css'

import VehicleSearchPanelInputBoxes from './VehicleSearchPanelInputBoxes';
import ActionButton from '../../Common/ActionButton';

import { getVehicleInformation } from '../../../interfaces/BackendCalls';
import VehicleSearchPanelDefaults from './VehicleSearchPanelDefaults';

function VehicleSearchPanel(props) {

    const state = props.state
    const inputVehicleInfoArray = props.state.inputVehicleInfoArray;

    const canSearch = useMemo(() => {
        const emptyItem = inputVehicleInfoArray.some(item => {
            if (!item.vehicleType || !item.manufacturer || !item.model ||  !item.modelYear) {            
                return true;
            }
            return false; 
        })
        return !emptyItem;
    }, [inputVehicleInfoArray]);

    function updateInputVehicleInfoInstance(id, value){
        props.dispatch(
            {
                type: "VehicleSearchPanel",
                subtype: "UpdateInputVehicleInfoInstance",
                id: id, 
                value: value
            }
        )
    }

    function resetValues() {
        
        props.dispatch({
            type: "General",
            subtype: 'ResetAll'
        })
    };

    function searchButton() {

        for (let i=0; i < inputVehicleInfoArray.length; i++) {
            const inputVehicleInfo = inputVehicleInfoArray[i];
            console.log("searchButton i", i);
            console.log("searchButton ivi", inputVehicleInfo);

            if (inputVehicleInfo.vehicleType && inputVehicleInfo.manufacturer && inputVehicleInfo.model &&  inputVehicleInfo.modelYear) {
                console.log("Getting VehicleInformation!!")
                const response = getVehicleInformation(inputVehicleInfo);
                response.then((response) => {
                    console.log("response", response);
                    props.dispatch({
                        "type": "VehicleSearchPanel",
                        "subtype": "UpdateInputVehicleInfoInstance",
                        "id": inputVehicleInfo.id,
                        "value": {
                            ...inputVehicleInfo,
                            "searchResult": response
                        }
                    })                    
                })
            } 
        }
    };

    function addNewEmptySearchInstance(){
        console.log("Adding New Search Instance");
        props.dispatch({
            "type": "VehicleSearchPanel",
            "subtype": "AddVehicleSearchInstance"
        })
    }

    function removeSearchInstance(id){
        props.dispatch({
            type: "VehicleSearchPanel",
            subtype: "RemoveVehicleSearchInstance",
            id: id
        })
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Consulta de Valores</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                {inputVehicleInfoArray.map((inputVehicleInfo) => (
                    <div key={inputVehicleInfo.id}>
                       <VehicleSearchPanelInputBoxes state={state} inputVehicleInfo={inputVehicleInfo} updateInputVehicleInfoInstance={updateInputVehicleInfoInstance} removeInstance={removeSearchInstance}/>
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