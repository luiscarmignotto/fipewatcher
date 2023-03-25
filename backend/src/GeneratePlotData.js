import { getAllVehicleInformationShort } from "./FipeRequests.js";
import ServerProperties from "./ServerProperties.js";

function generateTableIdArray(initialTableId, latestTableId, plotStep){
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

async function generatePlotData({inputVehicleInfo, plotOptions}) {

    console.log("generatePlotData Start");
    console.log({inputVehicleInfo});
    console.log({plotOptions});

    const latestTableId = ServerProperties().latestTableId; 
    const initialTableId = latestTableId - plotOptions.numberOfMonths;
    const maxDisplayedMonths = plotOptions.maxDisplayedMonths;
    var plotStep = Math.round((latestTableId - initialTableId)/maxDisplayedMonths);
    if (plotStep < 1) {
        plotStep = 1;
    }
    const tableIdArray = generateTableIdArray(initialTableId, latestTableId, plotStep);

    console.log({tableIdArray});
    
    const response = await tableIdArray.reduce(async (accumulatedPromise, referenceTableId) => {
        const accumulated = await accumulatedPromise;
        console.log({accumulated});
        console.log({referenceTableId});
        try {
            const vehicleInfoResponse = await getAllVehicleInformationShort({inputVehicleInfo: {...inputVehicleInfo, referenceTableId}});
            console.log({vehicleInfoResponse});
            if (vehicleInfoResponse.result.MesReferencia && vehicleInfoResponse.result.Valor) {
                return {
                    ...accumulated, 
                    result: {
                        monthArray: [...accumulated.result.monthArray, vehicleInfoResponse.result.MesReferencia],
                        valueArray: [...accumulated.result.valueArray, vehicleInfoResponse.result.Valor]
                    }
                }
            } 
            console.log("skipping null");
            return {...accumulated};
        } catch (error) {
            console.log("Could not find data for ", referenceTableId);
            return accumulated;
        }
    }, Promise.resolve({id: inputVehicleInfo.id, result:{monthArray: [], valueArray: []}}));

    return response;
}

export { generatePlotData }; 