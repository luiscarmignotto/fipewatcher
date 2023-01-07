import React, { useState, useEffect } from 'react';
import { GetManufacturersList } from '../../../interfaces/BackendCalls';

import SearchBox from '../Common/SearchBox';

function SearchManufacturer(props) {

    const [manufacturersList, setManufacturersList] = useState(null);

    useEffect(() => {
        GetManufacturersList(props.vehicleType.id).then((result) => result.length > 0 ? setManufacturersList(result) : null);
    }, [props.vehicleType]);

    return (

        <div>
            <SearchBox setOption={props.setManufacturer} itemsList={manufacturersList} placeholder="Digite a Marca"/>
        </div>
    )

}

export default SearchManufacturer;