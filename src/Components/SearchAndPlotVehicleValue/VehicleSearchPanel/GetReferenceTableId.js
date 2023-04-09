import React, { useState, useEffect } from 'react';
import { getReferenceTableIdList } from '../../../interfaces/BackendCalls';
import ActivityIndicator from '../../Common/ActivityIndicator';

import ChooseBox from '../../Common/ChooseBox';

function GetReferenceTableId({inputVehicleInfo, dispatch}) {

    const [referenceTableIdList, setReferenceTableIdList] = useState({loading: true});

    useEffect(() => {
        getReferenceTableIdList(inputVehicleInfo)
        .then((result) => {
                setReferenceTableIdList({loading: false, result});            
        })
        .catch((error) => setReferenceTableIdList({loading: false, error}));
    }, [inputVehicleInfo.referenceTableId]);

    function setReferenceTableId(referenceTableId){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'UpdateInputVehicleInfoInstance',
            id: inputVehicleInfo.id,
            referenceTableId,
            vehicleType: null,
            manufacturer: null,
            model: null, 
            modelYear: null,
            searchResult: null
        })
    };

    if (referenceTableIdList.loading) {
        return (
            <ActivityIndicator/>
        )
    }
    if (referenceTableIdList.result) {

        if (referenceTableIdList.length === 0) {
            return <div>Length 0</div>
        } 

        return (
            <div>
                <ChooseBox itemsList={referenceTableIdList.result} setOption={setReferenceTableId} displayItem={inputVehicleInfo.referenceTableId} defaultValue="Selecione o ano e mês de referência"/>
            </div>
        )
    }
    if (referenceTableIdList.error) {
        return(
            <div>{referenceTableIdList.error.message}</div>
        )
    }
    
    return(<div>Unknown State</div>)

}

export default GetReferenceTableId;