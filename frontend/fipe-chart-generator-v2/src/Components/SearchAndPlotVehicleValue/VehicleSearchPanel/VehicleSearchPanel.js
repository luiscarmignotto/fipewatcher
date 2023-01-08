import React, {useState } from 'react';

import './VehicleSearchPanel.css'

import GetVehicleType from './GetVehicleType';
import SearchManufacturer from './SearchManufacturer';
import SearchModel from './SearchModel';
import SearchModelYear from './SearchModelYear';
import ShowVehicleInformation from './ShowVehicleInformation';

function VehicleSearchPanel(props) {

    const [searchFlag, setSearchFlag] = useState(false);

    const [vehicleType, setVehicleType] = useState(null);
    const [manufacturer, setManufacturer] = useState(null);
    const [model, setModel] = useState(null);
    const [modelYear, setModelYear] = useState(null);
    const [vehicleDisplayInformation, setVehicleDisplayInformation] = useState(null);

    function resetValues(){
        setVehicleType(null);
        setManufacturer(null);
        setModel(null);
        setModelYear(null);
        setSearchFlag(false);
        props.setVehicleInformation(null);
        props.setPlotOptions(null);        
    }

    function generateVehicleInformation(){

        const vehicleInformation = {
            "vehicleType": vehicleType,
            "manufacturer": manufacturer,
            "model": model,
            "modelYear": modelYear            
        }
        
        props.setVehicleInformation(vehicleInformation);
    }

    return (

        <div className="VehicleSearchPanel">
            <div className="VehicleSearchPanelHeading">Consulta de Valores</div>
            <div className="VehicleSearchPanelBoxes">
                {!props.vehicleInformation && <GetVehicleType setVehicleType={setVehicleType} vehicleType={vehicleType}/>}
                {!props.vehicleInformation && vehicleType && <SearchManufacturer vehicleType={vehicleType} setManufacturer={setManufacturer}/>}
                {!props.vehicleInformation && vehicleType && manufacturer && <SearchModel vehicleType={vehicleType} manufacturer={manufacturer} setModel={setModel}/>}
                {!props.vehicleInformation && vehicleType && manufacturer && model && <SearchModelYear vehicleType={vehicleType} manufacturer={manufacturer} model={model} setModelYear={setModelYear}/>}
            {vehicleType && manufacturer && model && modelYear && searchFlag && 
                <div className="VehicleSearchPanelShowInfo">
                    <ShowVehicleInformation vehicleType={vehicleType} manufacturer={manufacturer} model={model} modelYear={modelYear} vehicleDisplayInformation={vehicleDisplayInformation} setVehicleDisplayInformation={setVehicleDisplayInformation}/>              
                </div>
            }            
            </div>
            <div className="VehicleSearchPanelButtons">
            {vehicleType && manufacturer && model && modelYear && !searchFlag && <button className="VehicleSearchPanelButton" onClick={() => { setSearchFlag(true); generateVehicleInformation() } }>Pesquisar</button>}
                {!searchFlag && <button className="VehicleSearchPanelButton" onClick={() => resetValues() }>Resetar Pesquisa</button>}
                {props.vehicleInformation && <button className="VehicleSearchPanelButton" onClick={() => resetValues() }>Pesquisar Novamente</button>}
            </div>

        </div>
    )

}

export default VehicleSearchPanel;