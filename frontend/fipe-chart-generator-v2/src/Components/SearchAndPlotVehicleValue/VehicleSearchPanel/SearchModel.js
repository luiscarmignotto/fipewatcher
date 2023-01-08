import React, { useState, useEffect } from 'react';
import { GetModelsList } from '../../../interfaces/BackendCalls';

import SearchBox from '../../Common/SearchBox';

function SearchModel(props) {

    const [modelsList, setModelsList] = useState(null);

    useEffect(() => {
        GetModelsList(props.vehicleType.id, props.manufacturer.Value).then((result) => result["Modelos"].length > 0 ? setModelsList(result["Modelos"]) : null);
    }, [props.vehicleType, props.manufacturer]);

    console.log("modelsList", modelsList);

    return (
        <div>
            <SearchBox setOption={props.setModel} itemsList={modelsList} placeholder="Digite o Modelo"/>
        </div>
    )

}

export default SearchModel;