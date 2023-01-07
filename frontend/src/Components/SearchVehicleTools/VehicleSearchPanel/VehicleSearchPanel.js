import React, {useState} from 'react';

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
    const [vehicleInformation, setVehicleInformation] = useState(null);
    
    //TEMPORARY

    // console.log("Manufacturer: ", manufacturer);
    // console.log("VehicleType: ", vehicleType);
    console.log("Model: ", model);
    console.log("ModelYear: ", modelYear);

    function resetValues(){
        setVehicleType(null);
        setManufacturer(null);
        setModel(null);
        setModelYear(null);
        setVehicleInformation(null);        
    }

    return (

        <div className="VehicleSearchPanel">
            {!vehicleInformation && <GetVehicleType setVehicleType={setVehicleType} vehicleType={vehicleType}/>}
            {!vehicleInformation && vehicleType && <SearchManufacturer vehicleType={vehicleType} setManufacturer={setManufacturer}/>}
            {!vehicleInformation && vehicleType && manufacturer && <SearchModel vehicleType={vehicleType} manufacturer={manufacturer} setModel={setModel}/>}
            {!vehicleInformation && vehicleType && manufacturer && model && <SearchModelYear vehicleType={vehicleType} manufacturer={manufacturer} model={model} setModelYear={setModelYear}/>}
            {!searchFlag && <button onClick={() => resetValues() }>Resetar Pesquisa</button>}
            {vehicleType && manufacturer && model && modelYear && !searchFlag && <button onClick={() => { if(!searchFlag){setSearchFlag(true)} } }>Pesquisar</button>}
            {vehicleType && manufacturer && model && modelYear && searchFlag && <ShowVehicleInformation vehicleType={vehicleType} manufacturer={manufacturer} model={model} modelYear={modelYear} vehicleInformation={vehicleInformation} setVehicleInformation={setVehicleInformation}/>}
            {vehicleInformation && <button onClick={() => resetValues() }>Pesquisar Novamente</button>}
        </div>
    )

}

export default VehicleSearchPanel;