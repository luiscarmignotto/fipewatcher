import React from 'react';

import ShowBox from '../../Common/ShowBox';

function ShowVehicleInformation({inputVehicleInfo}) {

    return (
        <ShowBox itemsList={inputVehicleInfo.searchResult} /> 
    )
}

export default ShowVehicleInformation;