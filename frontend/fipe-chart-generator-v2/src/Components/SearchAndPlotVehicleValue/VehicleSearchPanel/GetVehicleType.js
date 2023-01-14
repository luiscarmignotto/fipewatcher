import React, {useState, useEffect, useRef } from 'react';
import { getVehicleTypes } from '../../../interfaces/BackendCalls';
import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType(props) {

    var count = useRef(0);

    const [vehicleTypeList,  setVehicleTypeList] = useState(null);

    useEffect(() => {
        if(!props.inputVehicleInfo.vehicleType) {
            getVehicleTypes().then((result) => { if (result.length > 0) { setVehicleTypeList(result) }} )
            count.current++; 
        }

        console.log("count,", count.current);

    }, [props.inputVehicleInfo.vehicleType]);
    
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

export default React.memo(GetVehicleType);