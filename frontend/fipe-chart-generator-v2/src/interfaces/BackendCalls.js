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
            "Content-Type": "application/json"    
        }
    }

    // console.log("bodyInfo: ", bodyInfo);

    if (bodyInfo) {
        payload["body"] = JSON.stringify(bodyInfo);
    }

    // console.log("Sending ", requestMethod, " request to ", operation, "with: ", payload);

    const response = await fetch(backendEndpoint, payload);
    const jsonData = await response.json();

    // console.log("jsonData: ", jsonData);

    return jsonData;

}

function getManufacturersList(inputVehicleInfo) {

    const operation = "SearchManufacturer";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id
    }

    return sendBackendRequest(operation, requestBodyInfo);

}

function getModelsList(inputVehicleInfo) {

    const operation = "SearchModels";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id,
        "manufacturerId": inputVehicleInfo.manufacturer.Value
    }

    return sendBackendRequest(operation, requestBodyInfo);

}

function getModelYearsList(inputVehicleInfo) {

    const operation = "SearchModelYears";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id,
        "manufacturerId": inputVehicleInfo.manufacturer.Value,
        "modelId": inputVehicleInfo.model.Value
    }

    return sendBackendRequest(operation, requestBodyInfo);

}

function getVehicleInformation(inputVehicleInfo) {

    const operation = "getVehicleInformation";

    const requestBodyInfo = {
        "vehicleTypeId": inputVehicleInfo.vehicleType.id,
        "manufacturerId": inputVehicleInfo.manufacturer.Value,
        "modelId": inputVehicleInfo.model.Value,
        "modelYearId": inputVehicleInfo.modelYear.Label
    }

    return sendBackendRequest(operation, requestBodyInfo);

}

function getVehicleTypes() {

    const operation = "getVehicleTypes";

    return sendBackendRequest(operation, null);
}

function getPlotData(vehicleInfo, plotOptions) {

    const operation = "getPlotData";

    const requestBodyInfo = {
        "vehicleInfo": vehicleInfo, 
        "plotOptions": plotOptions
    }

    return sendBackendRequest(operation, requestBodyInfo);
}

export { getVehicleTypes, getManufacturersList, getModelsList, getModelYearsList, getVehicleInformation, getPlotData }