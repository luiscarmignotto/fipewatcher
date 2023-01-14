import React from 'react';

import ShowBox from '../../Common/ShowBox';

function ShowVehicleInformation(props) {

    return (
        <ShowBox itemsList={props.inputVehicleInfo.searchResult} /> 
    )
}

export default ShowVehicleInformation;