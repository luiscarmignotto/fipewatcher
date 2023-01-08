import React, {useState, useEffect } from 'react';
import { GetVehicleTypes } from '../../../interfaces/BackendCalls';

import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType(props) {

    const [vehicleTypeList,  setVehicleTypeList] = useState(null)

    useEffect(() => {
        GetVehicleTypes().then((result) => { if (result.length > 0) { setVehicleTypeList(result) }} )
    }, [props.searchAgain]);
    
    // console.log("vehicleTypeList", vehicleTypeList)

    return (

        <div className="GetVehicleTypeBox">
            {vehicleTypeList && <ChooseBox className="GetVehicleDataSearchBox" itemsList={vehicleTypeList} setOption={props.setVehicleType}/>} 
            {!vehicleTypeList && <div>ERRO AO SE CONECTAR COM O SERVIDOR</div>}
        </div>
    )

}

export default GetVehicleType;