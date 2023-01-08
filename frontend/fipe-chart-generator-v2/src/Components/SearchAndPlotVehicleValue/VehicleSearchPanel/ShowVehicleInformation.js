import React, { useEffect } from 'react';
import { GetVehicleInformation } from '../../../interfaces/BackendCalls';

import ShowBox from '../../Common/ShowBox';

function ShowVehicleInformation(props) {

    useEffect(() => {
        if (!props.vehicleDisplayInformation) {
            GetVehicleInformation(props.vehicleType.id, props.manufacturer.Value, props.model.Value, props.modelYear.Label).then((result) => { props.setVehicleDisplayInformation(result) } );
        }    
    }, [props]);

    return (

        <ShowBox className="GetVehicleDataSearchBox" itemsList={props.vehicleDisplayInformation} />

    )

}

export default ShowVehicleInformation;