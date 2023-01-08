const backendProperties = require('./BackendConfig.json');

async function SendBackendRequest(operation, bodyInfo) {

    // console.log("backendProperties", backendProperties);

    const backendEndpoint = backendProperties.url + backendProperties.routes[operation];

    const requestMethod = (bodyInfo ? 'POST' : 'GET');

    var payload = {
        method: requestMethod, 
        cache: 'no-cache',
        withCredentials: false, 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json;",
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",      
        }
    }

    // console.log("bodyInfo: ", bodyInfo);

    if (bodyInfo) {
        payload["body"] = JSON.stringify(bodyInfo);
    }

    console.log("Sending ", requestMethod, " request to ", operation, "with: ", payload);

    const response = await fetch(backendEndpoint, payload)
    const jsonData = await response.json();

    console.log("jsonData: ", jsonData);

    return jsonData;

}

async function GetBackendInfo (operation, bodyInfo) {

    const response = await SendBackendRequest(operation, bodyInfo);
    return response;

}

async function GetManufacturersList(vehicleTypeId) {

    const operation = "SearchManufacturer";

    const requestBodyInfo = {
        "vehicleTypeId": vehicleTypeId
    }

    const response = await GetBackendInfo(operation, requestBodyInfo);
    return response

}

async function GetModelsList(vehicleTypeId, manufacturerId) {

    const operation = "SearchModels";

    const requestBodyInfo = {
        "vehicleTypeId": vehicleTypeId,
        "manufacturerId": manufacturerId
    }

    const response = await GetBackendInfo(operation, requestBodyInfo);
    return response

}

async function GetModelYearsList(vehicleTypeId, manufacturerId, modelId) {

    const operation = "SearchModelYears";

    const requestBodyInfo = {
        "vehicleTypeId": vehicleTypeId,
        "manufacturerId": manufacturerId,
        "modelId": modelId
    }

    const response = await GetBackendInfo(operation, requestBodyInfo);
    return response

}

async function GetVehicleInformation(vehicleTypeId, manufacturerId, modelId, modelYearId) {

    const operation = "GetVehicleInformation";

    const requestBodyInfo = {
        "vehicleTypeId": vehicleTypeId,
        "manufacturerId": manufacturerId,
        "modelId": modelId,
        "modelYearId": modelYearId
    }

    const response = await GetBackendInfo(operation, requestBodyInfo);
    return response

}

async function GetVehicleTypes() {

    const operation = "GetVehicleTypes";

    const response = await GetBackendInfo(operation, null);
    return response
}

async function GetPlotData(vehicleInfo, plotOptions) {

    const operation = "GetPlotData";

    const requestBodyInfo = {
        "vehicleInfo": vehicleInfo, 
        "plotOptions": plotOptions
    }

    const response = await GetBackendInfo(operation, requestBodyInfo);
    return response
}

export { GetVehicleTypes, GetManufacturersList, GetModelsList, GetModelYearsList, GetVehicleInformation, GetPlotData }