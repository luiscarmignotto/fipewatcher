import React from 'react';

import ShowBox from '../../Common/ShowBox';

function ShowVehicleInformation({inputVehicleInfo}) {

    if (Object.keys(inputVehicleInfo.searchResult).length > 0) {
        return (
            <ShowBox itemsList={inputVehicleInfo.searchResult} />  
        )
    }

    return (
        <ShowBox itemsList={{
           "Marca":  inputVehicleInfo.manufacturer.Label,
           "Modelo": inputVehicleInfo.model.Label,
           "AnoModelo": inputVehicleInfo.modelYear.Label.split(" ")[0],
           "Combustível": inputVehicleInfo.modelYear.Label.split(" ")[1],
           "Mês Referência": inputVehicleInfo.referenceTableId.Label,
           "Valor": "SEM DADOS DISPONÍVEIS"           
        }} />  
    )

}

export default ShowVehicleInformation;