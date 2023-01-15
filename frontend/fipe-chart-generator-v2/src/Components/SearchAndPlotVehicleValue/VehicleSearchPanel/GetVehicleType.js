import React, {useState, useEffect, useRef } from 'react';
import { getVehicleTypes } from '../../../interfaces/BackendCalls';
import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType(props) {

    const [vehicleTypeList,  setVehicleTypeList] = useState(null);
    
    useEffect(() => {
        if(!props.inputVehicleInfo.vehicleType) {
            getVehicleTypes().then((result) => { if (result.length > 0) { setVehicleTypeList(result) }} )
        }
    }, [props.inputVehicleInfo.vehicleType]);
    
    function handleChoice(choiceValue) {
        // console.log("setVehicleType HandleChoice", choiceValue);
        props.setVehicleType(choiceValue)
    }

    return (
        <div>
            {vehicleTypeList && <ChooseBox itemsList={vehicleTypeList} setOption={handleChoice} displayItem={props.inputVehicleInfo.vehicleType}/>} 
            {!vehicleTypeList && <div>ERRO AO SE CONECTAR COM O SERVIDOR</div>}
        </div>
    )

}

export default React.memo(GetVehicleType);