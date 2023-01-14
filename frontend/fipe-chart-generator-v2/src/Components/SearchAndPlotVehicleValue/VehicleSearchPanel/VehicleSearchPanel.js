import React, {useState } from 'react';

import '../css/UserInputPanel.css'

import GetVehicleType from './GetVehicleType';
import SearchManufacturer from './SearchManufacturer';
import SearchModel from './SearchModel';
import SearchModelYear from './SearchModelYear';
import ShowVehicleInformation from './ShowVehicleInformation';
import ActionButton from '../../Common/ActionButton';

import { getVehicleInformation } from '../../../interfaces/BackendCalls';



function VehicleSearchPanel(props) {

    function resetValues(){
        props.setInputVehicleInfo({});    
    }

    function searchButton(){

        if (props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && props.inputVehicleInfo.model &&  props.inputVehicleInfo.modelYear) {
            getVehicleInformation(props.inputVehicleInfo).then((result) => { props.setInputVehicleInfo({...props.inputVehicleInfo, "searchResult": result}) } );
        }
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Head">Consulta de Valores</div>
            <div className="UserInputPanel__Content">
                <div className="UserInputPanel__Content--InputBoxesContainer">
                    
                    <GetVehicleType inputVehicleInfo={props.inputVehicleInfo} setInputVehicleInfo={props.setInputVehicleInfo} />
            
                { props.inputVehicleInfo.vehicleType && 
                    <SearchManufacturer inputVehicleInfo={props.inputVehicleInfo} setInputVehicleInfo={props.setInputVehicleInfo}/>
                }
                { props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && 
                    <SearchModel inputVehicleInfo={props.inputVehicleInfo} setInputVehicleInfo={props.setInputVehicleInfo}/>
                }
                { props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && props.inputVehicleInfo.model && 
                    <SearchModelYear inputVehicleInfo={props.inputVehicleInfo} setInputVehicleInfo={props.setInputVehicleInfo}/>
                }           
                </div>
                <div className="UserInputPanel__Content--ActionButtonsContainer">
                    {props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && props.inputVehicleInfo.model && props.inputVehicleInfo.modelYear && <ActionButton onClick={searchButton} text="Pesquisar"/>}
                    {<ActionButton onClick={resetValues} text="Resetar Pesquisa"/>}
                </div>                
            </div>
        </div>
    )

}

export default VehicleSearchPanel;