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

    const [vehicleType, setVehicleType] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [model, setModel] = useState(null);
    const [modelYear, setModelYear] = useState(null);
    const [vehicleDisplayInformation, setVehicleDisplayInformation] = useState(null);

    function ResetValues(){
        setVehicleType(null);
        setManufacturer(null);
        setModel(null);
        setModelYear(null);
        setSearchFlag(false);
        props.setVehicleInformation(null);
        props.setPlotOptions(null);        
    }

    function GenerateVehicleInformation(){

        const vehicleInformation = {
            "vehicleType": vehicleType,
            "manufacturer": manufacturer,
            "model": model,
            "modelYear": modelYear            
        }
        
        props.setVehicleInformation(vehicleInformation);
    }

    function SearchButton(){
        setSearchFlag(true);
        GenerateVehicleInformation();
    }

    return (

        <div className="UserInputPanelContainer">
            <div className="UserInputPanel__Heading">Consulta de Valores</div>
            <div className="UserInputPanel__InputBoxesContainer">
                {!props.vehicleInformation && <GetVehicleType setVehicleType={setVehicleType} vehicleType={vehicleType}/>}
                {!props.vehicleInformation && vehicleType && <SearchManufacturer vehicleType={vehicleType} setManufacturer={setManufacturer}/>}
                {!props.vehicleInformation && vehicleType && manufacturer && <SearchModel vehicleType={vehicleType} manufacturer={manufacturer} setModel={setModel}/>}
                {!props.vehicleInformation && vehicleType && manufacturer && model && <SearchModelYear vehicleType={vehicleType} manufacturer={manufacturer} model={model} setModelYear={setModelYear}/>}
            {vehicleType && manufacturer && model && modelYear && searchFlag && 
                <div className="UserInputPanel__DisplayInformation">
                    <ShowVehicleInformation vehicleType={vehicleType} manufacturer={manufacturer} model={model} modelYear={modelYear} vehicleDisplayInformation={vehicleDisplayInformation} setVehicleDisplayInformation={setVehicleDisplayInformation}/>              
                </div>
            }            
            </div>
            <div className="UserInputPanel__ActionButtonsContainer">
                {vehicleType && manufacturer && model && modelYear && !searchFlag && <ActionButton onClick={SearchButton} text="Pesquisar"/>}
                {!searchFlag && <ActionButton onClick={ResetValues} text="Resetar Pesquisa"/>}
                {props.vehicleInformation && <ActionButton onClick={ResetValues} text="Pesquisar Novamente"/>}
            </div>

        </div>
    )

}

export default VehicleSearchPanel;