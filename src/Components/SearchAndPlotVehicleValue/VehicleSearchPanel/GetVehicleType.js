import React, {useState, useEffect } from 'react';
import { getVehicleTypes } from '../../../interfaces/BackendCalls';
import ActivityIndicator from '../../Common/ActivityIndicator';
import ChooseBox from '../../Common/ChooseBox';

function GetVehicleType({inputVehicleInfo, dispatch}) {

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

    function setVehicleType(vehicleType){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'UpdateInputVehicleInfoInstance',
            id: inputVehicleInfo.id,
            vehicleType,
            manufacturer: null, 
            model: null, 
            searchResult: null
        })
    };
    
    if (vehicleTypeList.result) {
        if (vehicleTypeList.result.length === 0) {
            return (<div>Length 0</div>)
        }
        return (
            <ChooseBox itemsList={vehicleTypeList.result} setOption={setVehicleType} displayItem={inputVehicleInfo.vehicleType}/>
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