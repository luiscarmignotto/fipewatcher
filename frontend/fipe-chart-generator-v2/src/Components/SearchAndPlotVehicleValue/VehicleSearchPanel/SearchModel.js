import React, { useState, useEffect } from 'react';
import { getModelsList } from '../../../interfaces/BackendCalls';

import SearchBox from '../../Common/SearchBox';

function SearchModel(props) {

    const [modelsList, setModelsList] = useState(null);

    useEffect(() => {
        getModelsList(props.inputVehicleInfo).then((result) => result["Modelos"].length > 0 ? setModelsList(result["Modelos"]) : null);
    }, [props]);


    function handleChoice(choiceValue){
        props.setInputVehicleInfo({
            ...props.inputVehicleInfo, 
            "model": choiceValue,
            "modelYear": null
        })
    }

    return (
        <div>
            <SearchBox setOption={handleChoice} itemsList={modelsList} placeholder="Digite o Modelo"/>
        </div>
    )

}

export default SearchModel;