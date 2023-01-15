import { React } from 'react';

import GetVehicleType from './GetVehicleType';
import SearchManufacturer from './SearchManufacturer';
import SearchModel from './SearchModel';
import SearchModelYear from './SearchModelYear';

import '../css/UserInputPanel.css'
import ActionButton from '../../Common/ActionButton';

const VehicleSearchPanelInputBoxes = (props) => {

    // console.log("VehicleSearchPanelInputBoxes", props.inputVehicleInfo)

    function setVehicleType(choiceValue){

        const value = {
            ...props.inputVehicleInfo,
            "vehicleType": choiceValue
        }
        // console.log("setInfo", props.inputVehicleInfo.id);
        // console.log("setInfo", value);
        props.updateInputVehicleInfoInstance(props.inputVehicleInfo.id, value);
    };

    function setManufacturer(choiceValue){
        const value = {
            ...props.inputVehicleInfo,
            "manufacturer": choiceValue,
            "model": null,
            "modelYear": null,
            "searchResult": null
        }
        // console.log("setInfo", props.inputVehicleInfo.id);
        // console.log("setInfo", value);
        props.updateInputVehicleInfoInstance(props.inputVehicleInfo.id, value);
    };

    function setModel(choiceValue){
        const value = {
            ...props.inputVehicleInfo,
            "model": choiceValue,
            "modelYear": null,
            "searchResult": null
        }
        // console.log("setInfo", props.inputVehicleInfo.id);
        // console.log("setInfo", value);
        props.updateInputVehicleInfoInstance(props.inputVehicleInfo.id, value);
    };

    function setModelYear(choiceValue){
        const value = {
            ...props.inputVehicleInfo,
            "modelYear": choiceValue,
            "searchResult": null
        }
        // console.log("setInfo", props.inputVehicleInfo.id);
        // console.log("setInfo", value);
        props.updateInputVehicleInfoInstance(props.inputVehicleInfo.id, value);
    };

    return (
        <div className="UserInputPanel__Content--InputBoxesContainer">        
            <GetVehicleType inputVehicleInfo={props.inputVehicleInfo} setVehicleType={setVehicleType} />
        
            { props.inputVehicleInfo.vehicleType && 
                <SearchManufacturer inputVehicleInfo={props.inputVehicleInfo} setManufacturer={setManufacturer}/>
            }
            { props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && 
                <SearchModel inputVehicleInfo={props.inputVehicleInfo} setModel={setModel}/>
            }
            { props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && props.inputVehicleInfo.model && 
                <SearchModelYear inputVehicleInfo={props.inputVehicleInfo} setModelYear={setModelYear}/>
            }  
            {props.searchAndPlotData.inputVehicleInfoArray.length > 1 && 
                <ActionButton onClick={() => {props.removeInstance(props.inputVehicleInfo)}} text="Remover Instância"/>
            }         
        </div>
    );
}

export default VehicleSearchPanelInputBoxes;
