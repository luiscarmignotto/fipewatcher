import React, { useState, useEffect } from 'react';
import { GetVehicleInformation } from '../../../interfaces/BackendCalls';

import ShowBox from '../Common/ShowBox';

function ShowVehicleInformation(props) {

    // const [vehicleInformation, setVehicleInformation] = useState(null);

    useEffect(() => {
        GetVehicleInformation(props.vehicleType.id, props.manufacturer.Value, props.model.Value, props.modelYear.Label).then((result) => props.setVehicleInformation(result));
    }, [props.vehicleType, props.manufacturer, props.model, props.modelYear]);

    console.log("vehicleInformation", props.vehicleInformation);

    return (

        <div>
            <ShowBox itemsList={props.vehicleInformation} />
        </div>
    )

}

export default ShowVehicleInformation;