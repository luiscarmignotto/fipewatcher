const backendProperties = require('./BackendConfig.json');

async function sendBackendRequest(operation, bodyInfo) {

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

    // console.log("Sending ", requestMethod, " request to ", operation, "with: ", payload);

    const response = await fetch(backendEndpoint, payload)
    const jsonData = await response.json();

    // console.log("jsonData: ", jsonData);

    return jsonData;

}

async function getBackendInfo (operation, bodyInfo) {

    const response = await sendBackendRequest(operation, bodyInfo);
    return response;

}

async function getManufacturersList(inputVehicleInfo) {

    const operation = "SearchManufacturer";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id
    }

    const response = await getBackendInfo(operation, requestBodyInfo);
    return response

}

async function getModelsList(inputVehicleInfo) {

    const operation = "SearchModels";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id,
        "manufacturerId": inputVehicleInfo.manufacturer.Value
    }

    const response = await getBackendInfo(operation, requestBodyInfo);
    return response

}

async function getModelYearsList(inputVehicleInfo) {

    const operation = "SearchModelYears";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id,
        "manufacturerId": inputVehicleInfo.manufacturer.Value,
        "modelId": inputVehicleInfo.model.Value
    }

    const response = await getBackendInfo(operation, requestBodyInfo);
    return response

}

async function getVehicleInformation(inputVehicleInfo) {

    const operation = "getVehicleInformation";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id,
        "manufacturerId": inputVehicleInfo.manufacturer.Value,
        "modelId": inputVehicleInfo.model.Value,
        "modelYearId": inputVehicleInfo.modelYear.Label
    }

    const response = await getBackendInfo(operation, requestBodyInfo);
    return response

}

async function getVehicleTypes() {

    const operation = "getVehicleTypes";

    const response = await getBackendInfo(operation, null);
    return response
}

async function getPlotData(vehicleInfo, plotOptions) {

    const operation = "getPlotData";

    const requestBodyInfo = {
        "vehicleInfo": vehicleInfo, 
        "plotOptions": plotOptions
    }

    const response = await getBackendInfo(operation, requestBodyInfo);
    return response
}

export { getVehicleTypes, getManufacturersList, getModelsList, getModelYearsList, getVehicleInformation, getPlotData }