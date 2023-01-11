import React, { useState, useEffect } from 'react';
import { getManufacturersList } from '../../../interfaces/BackendCalls';

import SearchBox from '../../Common/SearchBox';

function SearchManufacturer(props) {

    const [manufacturersList, setManufacturersList] = useState(null);

    useEffect(() => {
        getManufacturersList(props.inputVehicleInfo).then((result) => result.length > 0 ? setManufacturersList(result) : null);
    }, [props]);

    function handleChoice(choiceValue) {
        props.setInputVehicleInfo({
            ...props.inputVehicleInfo, 
            "manufacturer": choiceValue,
            "model": null,
            "modelYear": null
        })
    }

    return (
        <div>
            <SearchBox setOption={handleChoice} itemsList={manufacturersList} placeholder="Digite a Marca"/>
        </div>
        
    )

}

export default SearchManufacturer;