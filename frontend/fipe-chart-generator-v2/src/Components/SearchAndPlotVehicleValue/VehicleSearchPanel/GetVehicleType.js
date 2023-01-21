import React, {useState, useEffect } from 'react';
import { getVehicleTypes } from '../../../interfaces/BackendCalls';
import ActivityIndicator from '../../Common/ActivityIndicator';
import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType(props) {

    const [vehicleTypeList,  setVehicleTypeList] = useState({loading: true});
    
    useEffect(() => {

        if (!vehicleTypeList.result) {
            getVehicleTypes()
            .then((result) => { 
                setVehicleTypeList({loading: false, result}) 
            })
            .catch((error) => setVehicleTypeList({loading: false, error}));
        }
    });
    
    function handleChoice(choiceValue) {
        // console.log("setVehicleType HandleChoice", choiceValue);
        props.setVehicleType(choiceValue)
    }

    if (vehicleTypeList.result) {

        if (vehicleTypeList.result.length === 0) {
            return (<div>Length 0</div>)
        }

        return (
            <ChooseBox itemsList={vehicleTypeList.result} setOption={handleChoice} displayItem={props.inputVehicleInfo.vehicleType}/>
        )
    }
    if (vehicleTypeList.error) {
        return(
            <div>{vehicleTypeList.error.message}</div>
        )
    }
    if (vehicleTypeList.loading) {
        return(
            <ActivityIndicator/>
        )
    } 
    
    return(<div>Unknown State</div>)
}

export default React.memo(GetVehicleType);