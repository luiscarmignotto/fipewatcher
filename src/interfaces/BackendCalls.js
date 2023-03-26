import config from './BackendConfig'

async function sendBackendRequest(operation, bodyInfo) {

    
    const backendEndpoint = "http://" + config.BACKEND_SERVICE_NAME + ':' + config.BACKEND_SERVICE_PORT + config.routes[operation];

    console.log({backendEndpoint});

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

    console.log("Sending ", requestMethod, " request to ", operation, "with: ", payload);

    const response = await fetch(backendEndpoint, payload);
    const jsonData = await response.json();

    console.log("jsonData: ", jsonData);

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

function getVehicleInformation(inputVehicleInfoArray) {

    console.log("getVehicleInformation start");
    console.log({inputVehicleInfoArray});

    const operation = "getVehicleInformation";

    return sendBackendRequest(operation, {inputVehicleInfoArray});

}

function getVehicleTypes() {

    const operation = "getVehicleTypes";

    return sendBackendRequest(operation, null);
}

function getPlotData(inputVehicleInfoArray, plotOptions) {

    const operation = "getPlotData";

    const requestBodyInfo = {
        inputVehicleInfoArray, 
        plotOptions
    }

    return sendBackendRequest(operation, requestBodyInfo);
}

export { getVehicleTypes, getManufacturersList, getModelsList, getModelYearsList, getVehicleInformation, getPlotData }