import React, {useState, useEffect } from 'react';
import { GetVehicleTypes } from '../../../interfaces/BackendCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType(props) {

    const [vehicleTypeList,  setVehicleTypeList] = useState(null)

    useEffect(() => {
        GetVehicleTypes().then((result) => { if (result.length > 0) { setVehicleTypeList(result) }} )
    }, [props.searchAgain]);
    
    // console.log("vehicleTypeList", vehicleTypeList)

    return (
        <div>
            {props.vehicleType && <FontAwesomeIcon icon="fa-light fa-car-side" />}
            {vehicleTypeList && <ChooseBox itemsList={vehicleTypeList} setOption={props.setVehicleType}/>} 
            {!vehicleTypeList && <div>ERRO AO SE CONECTAR COM O SERVIDOR</div>}
        </div>
    )

}

export default GetVehicleType;