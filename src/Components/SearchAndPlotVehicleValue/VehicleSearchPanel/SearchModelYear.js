import React, { useState, useEffect } from 'react';
import { getModelYearsList } from '../../../interfaces/BackendCalls';
import ActivityIndicator from '../../Common/ActivityIndicator';

import SearchBox from '../../Common/SearchBox';

function SearchModelYear({inputVehicleInfo, dispatch}) {

    const [modelYearsList, setModelYearsList] = useState({loading: true});

    useEffect(() => {
        getModelYearsList(inputVehicleInfo)
        .then((result) => setModelYearsList({loading: false, result}))
        .catch((error) => setModelYearsList({loading: false, error}));
    }, [inputVehicleInfo.model]);

    function setModelYear(modelYear){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'UpdateInputVehicleInfoInstance',
            id: inputVehicleInfo.id,
            modelYear
        })
    };  
    
    if (modelYearsList.loading) {
        return (
            <ActivityIndicator/>
        )
    }

    if (modelYearsList.result) {
        if (modelYearsList.result.length === 0) {
            return (
                <div>Length 0</div>
            )
        }
        return (
            <SearchBox itemsList={modelYearsList.result} placeholder="Digite o Ano" setOption={setModelYear}/>
        )        
    }

    if (modelYearsList.error) {
        return (
            <div>{modelYearsList.error.message}</div>
        )
    }

    return (<div>Unknown State</div>)

}

export default SearchModelYear;