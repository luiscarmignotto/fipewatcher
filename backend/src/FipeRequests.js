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

    console.log("Sending Post Request to ", url, "with: ", payload);

    try {
        const response = await fetch(url, payload);
        const jsonData = await response.json();
        console.log({jsonData});
        return jsonData; 
    } catch (error) {
        return error.message
    }

}


function getManufacturers(requestBody) {

    const operation = '/ConsultarMarcas';

    // console.log("RequestBody: ", requestBody)

    const getManufacturersRequest = {
        "codigoTabelaReferencia": "295",
        "codigoTipoVeiculo": requestBody.vehicleTypeId
    }

    const response = SendPostRequest(operation, getManufacturersRequest)
    .then((response) => response )
    .catch((error) => error.message);

    console.log("Response: ", response);

    return response;
       
}

function getModels(requestBody) {

    const operation = '/ConsultarModelos';

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "295",
        "codigoMarca" : requestBody.manufacturerId
    }

    const response = SendPostRequest(operation, getModelsRequest)
    .then((result) => result["Modelos"])
    .catch((error) => error.message);

    return response;
       
}

function getModelYear(requestBody) {

    const operation = '/ConsultarAnoModelo';

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "295",
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId
    }

    const response = SendPostRequest(operation, getModelsRequest)
    .then((response) => response)
    .catch((error) => error.message);

    // console.log("Response: ", response);

    return response;
       
}

function getAllVehicleInformation(requestBody) {

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

    const response = SendPostRequest(operation, getModelsRequest)
    .then((response) => response)
    .catch((error) => error.message);

    return {
        id: requestBody.id, 
        result: response
    }
}

async function getAllVehicleInformationShort({inputVehicleInfo}) {

    console.log("getAllVehicleInformationShort Start");
    console.log({inputVehicleInfo});

    const operation = '/ConsultarValorComTodosParametros';

    var referenceTableId = ServerProperties().latestTableId;

    if (inputVehicleInfo.referenceTableId) {
        console.log("Inside", {referenceTableId});
        referenceTableId = inputVehicleInfo.referenceTableId;
    }

    console.log("inputVehicleInfo: ",  inputVehicleInfo);

    const getModelsRequest = {
        "codigoTipoVeiculo" : inputVehicleInfo.vehicleType.id,
        "codigoTabelaReferencia" : referenceTableId,
        "codigoModelo": inputVehicleInfo.model.Value,
        "codigoMarca" : inputVehicleInfo.manufacturer.Value,
        "tipoVeiculo": inputVehicleInfo.vehicleType.name,
        "tipoConsulta": "tradicional",
        "codigoTipoCombustivel": "1",
        "anoModelo": inputVehicleInfo.modelYear.Label.replace(/\D/g,'')
    }

    const responseItens = ["Marca", "Modelo", "AnoModelo", "Combustivel", "MesReferencia", "Valor" ]

    const response = await SendPostRequest(operation, getModelsRequest);

    return responseItens.reduce((accumulated, key) => {
        return {
            ...accumulated,
            result: {
                ...accumulated.result,
                [key]: response[key]
            }
            
        }
    }, {id: inputVehicleInfo.id})
  
}

async function handleBatch(requestBody, requestHandlerFunction){

    console.log("Handle Batch Start");

    console.log(requestBody);

    const {inputVehicleInfoArray, ...rest } = requestBody;

    const batchResponse = await inputVehicleInfoArray.reduce(async (accumulatedPromise, inputVehicleInfo) => {
        const accumulated = await accumulatedPromise;
        console.log({accumulated});
        const instanceResponse = await requestHandlerFunction({inputVehicleInfo, ...rest});
        console.log({instanceResponse});
        return [...accumulated, instanceResponse];
    }, Promise.resolve([]));

    console.log("HandleBatch Response: ", batchResponse);

    return batchResponse; 

}

function getVehicleTypes(){

    console.log("getVehicleTypes Start");

    const vehicleTypes = [
        { "Label": "Carros e Utilitários", "id": 1, "name": "carro", "icon":"faCar"},
        { "Label": "Caminhões e micro-ônibus", "id": 3, "name": "caminhao"},
        { "Label": "Motos", "id": 2, "name": "moto"}
    ]

    return vehicleTypes
}

export { handleBatch, getManufacturers, getModels, getModelYear, getAllVehicleInformation, getAllVehicleInformationShort,  getVehicleTypes };