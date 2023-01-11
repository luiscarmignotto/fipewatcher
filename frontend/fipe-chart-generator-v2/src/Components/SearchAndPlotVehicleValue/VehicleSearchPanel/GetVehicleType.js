import React, {useState, useEffect } from 'react';
import { getVehicleTypes } from '../../../interfaces/BackendCalls';
import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType(props) {

    const [vehicleTypeList,  setVehicleTypeList] = useState(null)

    useEffect(() => {
       
        getVehicleTypes().then((result) => { if (result.length > 0) { setVehicleTypeList(result) }} )
        console.log(vehicleTypeList);

    }, [props]);
    
    function handleChoice(choiceValue) {

        props.setInputVehicleInfo({
            ...props.inputVehicleInfo, 
            "vehicleType": choiceValue, 
            "manufacturer": null, 
            "model": null,
            "modelYear": null
        })


    }

    return (
        <div>
            {vehicleTypeList && <ChooseBox itemsList={vehicleTypeList} setOption={handleChoice}/>} 
            {!vehicleTypeList && <div>ERRO AO SE CONECTAR COM O SERVIDOR</div>}
        </div>
    )

}

export default GetVehicleType;