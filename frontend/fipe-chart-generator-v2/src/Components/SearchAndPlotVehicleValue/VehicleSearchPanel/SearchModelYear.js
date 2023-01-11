import React, { useState, useEffect } from 'react';
import { getModelYearsList } from '../../../interfaces/BackendCalls';

import SearchBox from '../../Common/SearchBox';

function SearchModelYear(props) {

    const [modelYearsList, setModelYearsList] = useState(null);

    useEffect(() => {
        getModelYearsList(props.inputVehicleInfo).then((result) => result.length > 0 ? setModelYearsList(result) : null);
    }, [props]);

    function handleChoice(choiceValue){
        props.setInputVehicleInfo({
            ...props.inputVehicleInfo, 
            "modelYear": choiceValue
        })
    }

    return (
        <SearchBox setOption={handleChoice} itemsList={modelYearsList} placeholder="Digite o Ano"/>
    )

}

export default SearchModelYear;