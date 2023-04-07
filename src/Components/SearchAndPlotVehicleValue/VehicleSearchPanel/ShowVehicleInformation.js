import React from 'react';

import ShowBox from '../../Common/ShowBox';

function ShowVehicleInformation({inputVehicleInfo}) {

    return (
        <div className="UserInputPanel__Content--DisplayInfo">
            <ShowBox itemsList={inputVehicleInfo.searchResult} /> 
        </div> 
    )
}

export default ShowVehicleInformation;