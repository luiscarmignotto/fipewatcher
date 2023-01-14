import React, { useState, useEffect } from 'react';

import '../css/UserInputPanel.css'

import VehicleSearchPanelInputBoxes from './VehicleSearchPanelInputBoxes';
import ActionButton from '../../Common/ActionButton';

import { getVehicleInformation } from '../../../interfaces/BackendCalls';






function VehicleSearchPanel(props) {

    const [canSearch, setCanSearch] = useState(false);

    useEffect(() => {

        checkIfUserInputIsComplete();

    }, [props.searchAndPlotData.inputVehicleInfoArray]);

    function setInputVehicleInfoInstance(id, value) {

        console.log("setInputVehicleInfoInstance id", id);
        console.log("setInputVehicleInfoInstance value", value);
    
        props.setSearchAndPlotData({
          ...props.searchAndPlotData,
          "inputVehicleInfoArray": [
            ...props.searchAndPlotData.inputVehicleInfoArray.slice(0,id), 
            value,
            ...props.searchAndPlotData.inputVehicleInfoArray.slice(id+1, props.searchAndPlotData.inputVehicleInfoArray.length)
          ]
        })

        // console.log("...props.searchAndPlotData.inputVehicleInfoArray.slice(0,id)", ...props.searchAndPlotData.inputVehicleInfoArray.slice(0,id))
        // console.log("...props.searchAndPlotData.inputVehicleInfoArray.slice(id+1, props.searchAndPlotData.inputVehicleInfoArray.length + 1)", ...props.searchAndPlotData.inputVehicleInfoArray.slice(id+1, props.searchAndPlotData.inputVehicleInfoArray.length + 1))
      }    

    function resetValues() {
        props.setSearchAndPlotData({
            "inputVehicleInfoArray": [{
                "id": 0
            }],
            "plotOptions": {},
            "plotData": []
        });

        setCanSearch(false);
    }

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

    }

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
                // setInputVehicleInfoInstance(inputVehicleInfo.id, { ...inputVehicleInfo, "searchResult": response } );
            }             
        }
        
        props.setSearchAndPlotData({
            ...props.searchAndPlotData,
            "inputVehicleInfoArray": localInputVehicleInfoArray
        })
    }

    function addNewSearchInstance(){
        const newId = props.searchAndPlotData.inputVehicleInfoArray.length;
        setInputVehicleInfoInstance(newId, {
            id: newId
        })
    }

    function removeSearchInstance(){
        const newId = props.searchAndPlotData.inputVehicleInfoArray.length;
        setInputVehicleInfoInstance(newId, {
            id: newId
        })
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Consulta de Valores</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--AllInstances">
                {props.searchAndPlotData.inputVehicleInfoArray.map((item, index) => (
                        <VehicleSearchPanelInputBoxes key={index} inputVehicleInfo={item} setInputVehicleInfoInstance={setInputVehicleInfoInstance}/>
                ))} 
                </div>

                <div className="UserInputPanel__Content--ActionButtonsContainer">
                    {canSearch && <ActionButton onClick={searchButton} text="Pesquisar"/>}
                    {<ActionButton onClick={resetValues} text="Resetar Pesquisa"/>}
                    {<ActionButton onClick={addNewSearchInstance} text="Comparar com outro veículo"/>}
                </div>                
            </div>
        </div>
    )

}

export default VehicleSearchPanel;