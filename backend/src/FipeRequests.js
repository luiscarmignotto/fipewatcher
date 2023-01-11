import fetch from 'node-fetch';

import ServerProperties from './ServerProperties.js';

async function SendPostRequest (operation, data) {

    const url = ServerProperties().fipeAPIUrl + operation; 

    const payload = {
        method: 'POST', 
        cache: 'no-cache',
        withCredentials: false, 
        headers: {
            "Content-Type": "application/json;",
            "Accept": "application/json;",
            "Access-Control-Allow-Credentials" : true,
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            // "Content-Encoding": "br"           
        },
        body: JSON.stringify(data)
    }

    // console.log("Sending Post Request to ", url, "with: ", payload);

    const response = await fetch(url, payload);

    const jsonData = await response.json();

    // console.log("JsonData: ", jsonData)

    return jsonData; 

}


async function GetManufacturers(requestBody) {

    const operation = '/ConsultarMarcas';

    // console.log("RequestBody: ", requestBody)

    const getManufacturersRequest = {
        "codigoTabelaReferencia": "292",
        "codigoTipoVeiculo": requestBody.vehicleTypeId
    }

    const response = await SendPostRequest(operation, getManufacturersRequest);

    // // console.log("Response: ", response);

    return response;
       
}

async function GetModels(requestBody) {

    const operation = '/ConsultarModelos';

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "292",
        "codigoMarca" : requestBody.manufacturerId
    }

    const response = await SendPostRequest(operation, getModelsRequest);

    // console.log("Response: ", response);

    return response;
       
}

async function GetModelYear(requestBody) {

    const operation = '/ConsultarAnoModelo';

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "292",
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId
    }

    const response = await SendPostRequest(operation, getModelsRequest);

    // console.log("Response: ", response);

    return response;
       
}

async function GetAllVehicleInformation(requestBody) {

    const operation = '/ConsultarValorComTodosParametros';

    // console.log("requestBody GetAllVehicleInformation: ",  requestBody);

    var referenceTableId = ServerProperties().latestTableId;

    if (requestBody["referenceTableId"]) {
        referenceTableId = requestBody.referenceTableId;
    } 

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : referenceTableId,
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId,
        "tipoVeiculo": requestBody.vehicleTypeString,
        "tipoConsulta": "tradicional",
        "codigoTipoCombustivel": "1",
        "anoModelo": requestBody.modelYearId.replace(/\D/g,'')
    }

    const response = await SendPostRequest(operation, getModelsRequest);

    return response;
       
}

async function GetAllVehicleInformationShort(requestBody) {

    const operation = '/ConsultarValorComTodosParametros';

    const referenceTableId = ServerProperties().latestTableId;

    if (requestBody.referenceTableId) {
        const referenceTableId = requestBody.referenceTableId;
    }

    console.log("requestBody: ",  requestBody);

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : referenceTableId,
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId,
        "tipoVeiculo": requestBody.vehicleTypeString,
        "tipoConsulta": "tradicional",
        "codigoTipoCombustivel": "1",
        "anoModelo": requestBody.modelYearId.replace(/\D/g,'')
    }

    const response = await SendPostRequest(operation, getModelsRequest);

    const responseItens = ["Marca", "Modelo", "AnoModelo", "Combustível", "MesReferencia", "Valor" ]

    var shortResponse = {};
    
    responseItens.map((item) => shortResponse[item] = response[item] )

    return shortResponse;
       
}

function getVehicleTypes(){

    const vehicleTypes = [
        { "Label": "Carros e Utilitários", "id": 1, "name": "carro", "icon":"faCar"},
        { "Label": "Caminhões e micro-ônibus", "id": 3, "name": "caminhao"},
        { "Label": "Motos", "id": 2, "name": "moto"}
    ]

    return vehicleTypes
}

export { GetManufacturers, GetModels, GetModelYear, GetAllVehicleInformation, GetAllVehicleInformationShort,  getVehicleTypes };