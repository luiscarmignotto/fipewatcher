import React, { useState, useEffect } from 'react';
import { GetModelYearsList } from '../../../interfaces/BackendCalls';

import SearchBox from '../../Common/SearchBox';

function SearchModelYear(props) {

    const [modelYearsList, setModelYearsList] = useState(null);

    useEffect(() => {
        GetModelYearsList(props.vehicleType.id, props.manufacturer.Value, props.model.Value).then((result) => result.length > 0 ? setModelYearsList(result) : null);
    }, [props.vehicleType, props.manufacturer, props.model.Value]);

    console.log("modelYearsList", modelYearsList);

    return (

        <div>
            <SearchBox setOption={props.setModelYear} itemsList={modelYearsList} placeholder="Digite o Ano"/>
        </div>
    )

}

export default SearchModelYear;