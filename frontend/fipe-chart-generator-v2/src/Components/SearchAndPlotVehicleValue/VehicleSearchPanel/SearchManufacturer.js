import React, { useState, useEffect } from 'react';
import { getManufacturersList } from '../../../interfaces/BackendCalls';
import ActivityIndicator from '../../Common/ActivityIndicator';

import SearchBox from '../../Common/SearchBox';

function SearchManufacturer({inputVehicleInfo, dispatch}) {

    const [manufacturersList, setManufacturersList] = useState({loading: true});

    useEffect(() => {
        getManufacturersList(inputVehicleInfo)
        .then((result) => {
                setManufacturersList({loading: false, result})
        })
        .catch((error) => setManufacturersList({loading: false, error}));
    }, [inputVehicleInfo.vehicleType]);

    function setManufacturer(manufacturer){
        dispatch({
            type: 'VehicleSearchPanel',
            subtype: 'UpdateInputVehicleInfoInstance',
            id: inputVehicleInfo.id,
            manufacturer,
            model: null, 
            modelYear: null,
            searchResult: null
        })
    };

    if (manufacturersList.loading) {
        return (
            <ActivityIndicator/>
        )
    }
    if (manufacturersList.result) {

        if (manufacturersList.length === 0) {
            return <div>Length 0</div>
        } 

        return (
            <div>
                <SearchBox itemsList={manufacturersList.result} placeholder="Digite a Marca" setOption={setManufacturer} />
            </div>
        )
    }
    if (manufacturersList.error) {
        return(
            <div>{manufacturersList.error.message}</div>
        )
    }
    
    return(<div>Unknown State</div>)

}

export default SearchManufacturer;