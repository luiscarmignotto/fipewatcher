import fetch from 'node-fetch';

async function SendPostRequest (url, data) {

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

    const response = await fetch(url, payload);

    const jsonData = await response.json();

    console.log("JsonData: ", jsonData)

    return jsonData; 

}


async function GetManufacturers(requestBody) {

    const url = 'https://veiculos.fipe.org.br/api/veiculos/ConsultarMarcas';

    // console.log("RequestBody: ", requestBody)

    const getManufacturersRequest = {
        "codigoTabelaReferencia": "292",
        "codigoTipoVeiculo": requestBody.vehicleTypeId
    }

    const response = await SendPostRequest(url, getManufacturersRequest);

    // // console.log("Response: ", response);

    return response;
       
}

async function GetModels(requestBody) {

    const url = 'https://veiculos.fipe.org.br/api/veiculos/ConsultarModelos';

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "292",
        "codigoMarca" : requestBody.manufacturerId
    }

    const response = await SendPostRequest(url, getModelsRequest);

    // console.log("Response: ", response);

    return response;
       
}

async function GetModelYear(requestBody) {

    const url = 'https://veiculos.fipe.org.br/api/veiculos/ConsultarAnoModelo';

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "292",
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId
    }

    const response = await SendPostRequest(url, getModelsRequest);

    // console.log("Response: ", response);

    return response;
       
}

async function GetAllVehicleInformation(requestBody) {

    const url = 'https://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros';

    console.log("requestBody: ",  requestBody);

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "292",
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId,
        "tipoVeiculo": requestBody.vehicleTypeString,
        "tipoConsulta": "tradicional",
        "codigoTipoCombustivel": "1",
        "anoModelo": requestBody.modelYearId
    }

    const response = await SendPostRequest(url, getModelsRequest);

    return response;
       
}

async function GetAllVehicleInformationShort(requestBody) {

    const url = 'https://veiculos.fipe.org.br/api/veiculos/ConsultarValorComTodosParametros';

    console.log("requestBody: ",  requestBody);

    const getModelsRequest = {
        "codigoTipoVeiculo" : requestBody.vehicleTypeId,
        "codigoTabelaReferencia" : "292",
        "codigoModelo": requestBody.modelId,
        "codigoMarca" : requestBody.manufacturerId,
        "tipoVeiculo": requestBody.vehicleTypeString,
        "tipoConsulta": "tradicional",
        "codigoTipoCombustivel": "1",
        "anoModelo": requestBody.modelYearId.replace(/\D/g,'')
    }

    const response = await SendPostRequest(url, getModelsRequest);

    const responseItens = ["Marca", "Modelo", "AnoModelo", "Combustível", "MesReferencia", "Valor" ]

    var shortResponse = {};
    
    responseItens.map((item) => shortResponse[item] = response[item] )

    return shortResponse;
       
}

function GetVehicleTypes(){

    const vehicleTypes = [
        { "Label": "Carros e Utilitários", "id": 1, "name": "carro"},
        { "Label": "Caminhões e micro-ônibus", "id": 3, "name": "caminhao"},
        { "Label": "Motos", "id": 2, "name": "moto"}
    ]

    return vehicleTypes
}

export { GetManufacturers, GetModels, GetModelYear, GetAllVehicleInformation, GetAllVehicleInformationShort,  GetVehicleTypes };