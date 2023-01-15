import React, { useState, useEffect } from 'react';

import '../css/UserInputPanel.css'

import VehicleSearchPanelInputBoxes from './VehicleSearchPanelInputBoxes';
import ActionButton from '../../Common/ActionButton';

import { getVehicleInformation } from '../../../interfaces/BackendCalls';
import VehicleSearchPanelDefaults from './VehicleSearchPanelDefaults';

function VehicleSearchPanel(props) {

    const [canSearch, setCanSearch] = useState(false);

    useEffect(() => {

        checkIfUserInputIsComplete();

    }, [props.searchAndPlotData.inputVehicleInfoArray]);

    function updateInputVehicleInfoInstance(id, value) {

        console.log("updateInputVehicleInfoInstance Start");

        const arrayIndex = props.searchAndPlotData.inputVehicleInfoArray.findIndex((item) => item.id === id);

        if (arrayIndex !== -1) {
            props.setSearchAndPlotData({
                ...props.searchAndPlotData,
                "inputVehicleInfoArray": [
                    ...props.searchAndPlotData.inputVehicleInfoArray.slice(0,arrayIndex),
                    value, 
                    ...props.searchAndPlotData.inputVehicleInfoArray.slice(arrayIndex+1)
                ]
            });            
        } else {
            props.setSearchAndPlotData({
                ...props.searchAndPlotData,
                "inputVehicleInfoArray": [
                    ...props.searchAndPlotData.inputVehicleInfoArray,
                    value
                ]
            });              
        }     
        console.log("arrayIndex", arrayIndex);     
    };

    function resetValues() {
        props.setSearchAndPlotData({
            "inputVehicleInfoArray": [{
                "id": 0
            }],
            "plotOptions": {},
            "plotData": []
        });

        setCanSearch(false);
    };

    function checkIfUserInputIsComplete(){

        for (const id in props.searchAndPlotData.inputVehicleInfoArray) {
            var inputVehicleInfo = props.searchAndPlotData.inputVehicleInfoArray[id];
            if (!inputVehicleInfo.vehicleType || !inputVehicleInfo.manufacturer || !inputVehicleInfo.model ||  !inputVehicleInfo.modelYear) {
                // console.log("InputIncomplete");
                setCanSearch(false);
                return;
            } 
        }
        // console.log("Can Search!!");
        setCanSearch(true);
    };

    async function searchButton() {

        const localInputVehicleInfoArray = [];

        for (let id=0; id < props.searchAndPlotData.inputVehicleInfoArray.length; id++) {

            const inputVehicleInfo = props.searchAndPlotData.inputVehicleInfoArray[id];
            
            console.log("searchButton id", id);
            console.log("searchButton ivi", inputVehicleInfo);

            if (inputVehicleInfo.vehicleType && inputVehicleInfo.manufacturer && inputVehicleInfo.model &&  inputVehicleInfo.modelYear) {
                console.log("Getting VehicleInformation!!")
                const response = await getVehicleInformation(inputVehicleInfo);
                console.log("response", response);
                localInputVehicleInfoArray.push({...inputVehicleInfo, "searchResult": response});
                // updateInputVehicleInfoInstance(inputVehicleInfo.id, { ...inputVehicleInfo, "searchResult": response } );
            }             
        }

        props.setSearchAndPlotData({
            ...props.searchAndPlotData,
            "inputVehicleInfoArray": localInputVehicleInfoArray
        })
    };

    function addNewEmptySearchInstance(){

        if (props.searchAndPlotData.inputVehicleInfoArray.length < VehicleSearchPanelDefaults().maxSearchInstances) {
            const inUseIds = props.searchAndPlotData.inputVehicleInfoArray.map((item) => item.id);

            for (let i = 0; i < VehicleSearchPanelDefaults().maxSearchInstances; i++) {
                if (!inUseIds.includes(i)) {
                    console.log("new id", i);
                    updateInputVehicleInfoInstance(i, {
                        id: i
                    })   
                    return;                  
                }
            }
        }
    }

    function removeSearchInstance(inputVehicleInfo){

        const toRemoveId = inputVehicleInfo.id; 
        console.log("removeSearchInstance", toRemoveId);
        console.log("filter", props.searchAndPlotData.inputVehicleInfoArray.filter((item) => item.id !== toRemoveId))
        
        props.setSearchAndPlotData({
            ...props.searchAndPlotData,
            "inputVehicleInfoArray": props.searchAndPlotData.inputVehicleInfoArray.filter((item) => item.id !== toRemoveId)
        })
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Consulta de Valores</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                {props.searchAndPlotData.inputVehicleInfoArray.map((inputVehicleInfo, index) => (
                    <div key={index}>
                       <VehicleSearchPanelInputBoxes searchAndPlotData={props.searchAndPlotData} inputVehicleInfo={inputVehicleInfo} updateInputVehicleInfoInstance={updateInputVehicleInfoInstance} removeInstance={removeSearchInstance}/>
                    </div>
                ))} 
                </div>

                <div className="UserInputPanel__Content--ActionButtonsContainer">
                {props.searchAndPlotData.inputVehicleInfoArray.length < VehicleSearchPanelDefaults().maxSearchInstances &&
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