import { GetAllVehicleInformation } from "./FipeRequests.js";
import ServerProperties from "./ServerProperties.js";

function GenerateTableIdArray(initialTableId, latestTableId, plotStep){
    let tableIdArray = [];
    if (typeof latestTableId === 'undefined') {
      latestTableId = initialTableId;
      initialTableId = 0;
    }
    for (let i = initialTableId; i < latestTableId; i += plotStep) {
      tableIdArray.push(i);
    }
    return tableIdArray;
}

function ExtractValue(vehicleInfoResponse){

    var rawValue = vehicleInfoResponse["Valor"]
                    .replace(".", "")
                    .replace(",",".")
                    .replace(/[^0-9.]/g,'');

    const value = Number(rawValue).toFixed(2);

    return value;

}

async function GeneratePlotData(requestBody) {

    console.log("requestBody", requestBody);

    var valueArray = [];
    var monthArray = [];

    const vehicleInfo = requestBody.vehicleInfo;
    const plotOptions = requestBody.plotOptions; 

    const latestTableId = ServerProperties().latestTableId; 
    const initialTableId = latestTableId - plotOptions.numberOfMonths;

    const maxDisplayedMonths = plotOptions.maxDisplayedMonths;

    var plotStep = Math.round((latestTableId - initialTableId)/maxDisplayedMonths);

    if (plotStep < 1) {
        plotStep = 1;
    }

    const tableIdArray = GenerateTableIdArray(initialTableId, latestTableId, plotStep); 

    console.log("tableIdArray", tableIdArray);

    var searchRequestBodyTemplate = {
        "vehicleTypeId" : vehicleInfo.vehicleType.id,
        "modelId": vehicleInfo.model.Value,
        "manufacturerId" : vehicleInfo.manufacturer.Value,
        "vehicleTypeString": vehicleInfo.vehicleType.name,
        "modelYearId": vehicleInfo.modelYear.Label     
    }

    for (const tableIdIndex of tableIdArray) {

        // console.log("tableIdIndex", tableIdIndex);

        var searchRequestBody = {...searchRequestBodyTemplate };
        searchRequestBody["referenceTableId"] = tableIdIndex;

        try {
            
            var vehicleInfoResponse = {};
            
            var vehicleInfoResponse = await GetAllVehicleInformation(searchRequestBody).then((result) => vehicleInfoResponse = result);

            // console.log("vehicleInfoResponse", vehicleInfoResponse);

            valueArray.push(ExtractValue(vehicleInfoResponse));
            monthArray.push(vehicleInfoResponse.MesReferencia);

        } catch (error) {
            console.log("Could not find data for referenceTableId: ", tableIdIndex);
            continue; 
        }
    }

    console.log("final valueArray", valueArray);
    console.log("final monthArray", monthArray);

    if (monthArray.length > 0 && valueArray.length > 0) {
        return {
            ...requestBody, 
            "monthArray": monthArray,
            "valueArray": valueArray
        }
    }

    return "Error";    

}

export { GeneratePlotData }; 