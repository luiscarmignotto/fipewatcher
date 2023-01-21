import { useReducer } from "react";
import VehicleSearchPanelDefaults from "./VehicleSearchPanelDefaults";
import produce from "immer";

const initialState = {
    "inputVehicleInfoArray": [{id: 0}],
    "plotOptions": {},
    "plotDataArray": [],
    "plotDataLabels": []
}

const reducer = produce((state, action) => {

    console.log("Reducer Start");
    console.log("action", action);

    switch (action.type) {

        case 'General': {
            switch(action.subtype) {
                case 'ResetAll': {
                    return initialState; 
                }
                default:
                    return state;
            }
        }

        case 'VehicleSearchPanel': {

            switch(action.subtype) {
                case 'AddVehicleSearchInstance': {   
                    
                    const inUseIds = state.inputVehicleInfoArray.map((item) => item.id);
                    console.log("inUseIds", inUseIds);
                    const availableIds = [...Array(VehicleSearchPanelDefaults().MAX_SEARCH_INSTANCES).keys()].filter((id) => !inUseIds.includes(id));
                    console.log("availableIds", availableIds);
                    
                    if (availableIds.length === 0) {
                        return state; 
                    }
        
                    const newInstanceId = Math.min(...availableIds);
                    console.log("newInstanceId", newInstanceId);
                    
                    state.inputVehicleInfoArray.push({
                        "id": newInstanceId
                    });
                    console.log("Reducer Finish");
                    return state;
                }
                case 'RemoveVehicleSearchInstance': {
                    
                    state["inputVehicleInfoArray"] = state.inputVehicleInfoArray.filter((item) => item.id !== action.id );
                    return state;
                }
                case 'UpdateInputVehicleInfoInstance': {

                    const vehicleInfoTypes = Object.keys(action).filter((item) => item !== "type" && item !== "subtype" && item !== "id");

                    state["inputVehicleInfoArray"] = state.inputVehicleInfoArray.map((item) => {
                        if (item.id === action.id){
                            vehicleInfoTypes.map((type) => {
                                console.log({type});
                                console.log([type], action[type]);
                                item = {
                                    ...item,
                                    [type]: action[type]
                                }
                            })
                        }
                        return item
                    });
                    console.log("state", state);
                    return state; 
                }        
                case 'ResetSearchResults': {
                    state["inputVehicleInfoArray"] = state.inputVehicleInfoArray.map((item) => { return {...item, "searchResult": null}});
                    return state;
                }
                default:
                    return state;                
            }
        }
        case 'PlotOptionsPanel': {
            switch (action.subtype) {
                case 'ResetPlotOptions': {
                    return {...state, "plotOptions": {}}; 
                }    
                case 'UpdatePlotOptions': {
                    return {...state, "plotOptions": action.plotOptions}
                }           
                default:
                    return state;
            }
        }
        case 'PlotPanel': {
            switch (action.subtype) {
                case 'UpdatePlotData': {
                    return {...state, "plotDataArray": action.plotDataArray, "plotDataLabels": action.plotDataLabels };
                }
                default:
                    return state;
            }
        }
        default: 
            return state;

    }    
}
)

export function useSearchAndPlotVehicleValueReducer(){
    return useReducer(reducer, initialState);
}