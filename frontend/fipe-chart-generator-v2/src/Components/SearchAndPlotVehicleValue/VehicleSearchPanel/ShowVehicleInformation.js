import React, { useEffect } from 'react';
import { getVehicleInformation } from '../../../interfaces/BackendCalls';

import ShowBox from '../../Common/ShowBox';

function ShowVehicleInformation(props) {

    useEffect(() => {
        if (!props.inputVehicleInfo.searchResult) {
            getVehicleInformation(props.inputVehicleInfo).then((result) => { props.setInputVehicleInfo({...props.inputVehicleInfo, "searchResult": result}) } );
        }    
    }, [props]);

    return (
        <ShowBox itemsList={props.inputVehicleInfo.searchResult} /> 
    )
}

export default ShowVehicleInformation;