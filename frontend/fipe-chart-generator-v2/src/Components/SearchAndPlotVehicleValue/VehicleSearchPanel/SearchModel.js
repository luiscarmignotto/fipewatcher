import React, { useState, useEffect } from 'react';
import { getModelsList } from '../../../interfaces/BackendCalls';
import ActivityIndicator from '../../Common/ActivityIndicator';

import SearchBox from '../../Common/SearchBox';

function SearchModel({inputVehicleInfo, dispatch}) {

    const [modelsList, setModelsList] = useState({loading: true});

    useEffect(() => {
        getModelsList(inputVehicleInfo)
        .then((result) => setModelsList({loading: false, result}))
        .catch((error) => setModelsList({loading: false, error}));
    }, [inputVehicleInfo.manufacturer]);

    function setModel(model){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'UpdateInputVehicleInfoInstance',
            id: inputVehicleInfo.id,
            model,
            modelYear: null,
            searchResult: null
        })
    };  
    
    if (modelsList.loading) {
        return (
            <ActivityIndicator/>
        )
    }
    if (modelsList.result) {
        if (modelsList.result.length === 0) {
            return <div>Length 0</div>
        }
        return (
            <div>
                <SearchBox itemsList={modelsList.result} placeholder="Digite o Modelo" setOption={setModel} />
            </div>
        )
    }
    if (modelsList.error) {
        return (
            <div>modelsList.error.message</div>
        )
    }

    return (<div>Unknown State</div>)
}

export default SearchModel;