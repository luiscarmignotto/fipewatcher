import React, {useState } from 'react';

import '../css/UserInputPanel.css'

import GetVehicleType from './GetVehicleType';
import SearchManufacturer from './SearchManufacturer';
import SearchModel from './SearchModel';
import SearchModelYear from './SearchModelYear';
import ShowVehicleInformation from './ShowVehicleInformation';
import ActionButton from '../../Common/ActionButton';

function VehicleSearchPanel(props) {

    const [searchFlag, setSearchFlag] = useState(false);

    function resetValues(){
        setSearchFlag(false);
        props.setInputVehicleInfo({});
        props.setPlotOptions(null);        
    }

    function searchButton(){
        setSearchFlag(true);    
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Heading">Consulta de Valores</div>
            <div className="UserInputPanel__InputBoxesContainer">
                
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
            {props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && props.inputVehicleInfo.model &&  props.inputVehicleInfo.modelYear && searchFlag && 
                <div className="UserInputPanel__DisplayInfo">
                    <ShowVehicleInformation inputVehicleInfo={props.inputVehicleInfo} setInputVehicleInfo={props.setInputVehicleInfo} />              
                </div>
            }            
            </div>
            <div className="UserInputPanel__ActionButtonsContainer">
                {props.inputVehicleInfo.vehicleType && props.inputVehicleInfo.manufacturer && props.inputVehicleInfo.model && props.inputVehicleInfo.modelYear && !searchFlag && <ActionButton onClick={searchButton} text="Pesquisar"/>}
                {!searchFlag && <ActionButton onClick={resetValues} text="Resetar Pesquisa"/>}
                {props.inputVehicleInfo.searchResult && <ActionButton onClick={resetValues} text="Pesquisar Novamente"/>}
            </div>

        </div>
    )

}

export default VehicleSearchPanel;