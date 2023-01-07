import React, {useState, useEffect } from 'react';
import { GetVehicleTypes } from '../../../interfaces/BackendCalls';

import ChooseBox from '../Common/ChooseBox';

function GetVehicleType(props) {

    const [vehicleTypeList,  setVehicleTypeList] = useState(null)

    useEffect(() => {
        GetVehicleTypes().then((result) => { if (result.length > 0) { setVehicleTypeList(result) }} )
    }, [props.searchAgain]);
    
    // console.log("vehicleTypeList", vehicleTypeList)

    return (

        <div>
            {vehicleTypeList && <ChooseBox itemsList={vehicleTypeList} setOption={props.setVehicleType}/>} 
        </div>
    )

}

export default GetVehicleType;