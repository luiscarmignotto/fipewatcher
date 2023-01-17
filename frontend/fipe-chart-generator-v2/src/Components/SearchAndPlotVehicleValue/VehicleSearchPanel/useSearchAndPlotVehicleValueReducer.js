import { useReducer, useCallback } from "react";
import VehicleSearchPanelDefaults from "./VehicleSearchPanelDefaults";

const initialState = {
    "inputVehicleInfoArray": [{id: 0}],
    "plotOptions": {},
    "plotDataArray": [],
    "plotDataLabels": []
}

function reducer(state, action) {

    console.log("Reducer Start");
    console.log("action", action);

    switch (action.type) {

        case 'General': {
            switch(action.subtype) {
                case 'ResetAll': {
                    const newState = initialState;
                    return newState; 
                }
                default:
                    return state;
            }
        }

        case 'VehicleSearchPanel': {

            switch(action.subtype) {
                case 'AddVehicleSearchInstance': {   
                    const newState = {...state}         
                    const inUseIds = newState.inputVehicleInfoArray.map((item) => item.id);
                    console.log("inUseIds", inUseIds);
                    const availableIds = [...Array(VehicleSearchPanelDefaults().MAX_SEARCH_INSTANCES).keys()].filter((id) => !inUseIds.includes(id));
                    console.log("availableIds", availableIds);
                    
                    if (availableIds.length === 0) {
                        return state; 
                    }
        
                    const newInstanceId = Math.min(...availableIds);
                    console.log("newInstanceId", newInstanceId);
                    // const newState = {...state};
                    newState.inputVehicleInfoArray.push({
                        "id": newInstanceId
                    });
                    console.log("Reducer Finish");
                    return newState;
                }
                case 'RemoveVehicleSearchInstance': {
                    const newState = {...state};
                    newState["inputVehicleInfoArray"] = newState.inputVehicleInfoArray.filter((item) => item.id !== action.id );
                    return newState;
                }
                case 'UpdateInputVehicleInfoInstance': {
                    console.log("Case UpdateInputVehicleInfoInstance");
                    const newState = {...state};
                    console.log("newState", newState);
                    console.log(newState.inputVehicleInfoArray.map((item) => item.id === action.id ? action.value : item ));
                    // newState["inputVehicleInfoArray"] = newState.inputVehicleInfoArray.map((item) => { if (item.id === action.id){return action.value}; return item});
                    newState["inputVehicleInfoArray"] = newState.inputVehicleInfoArray.map((item) => item.id === action.id ? action.value : item );
                    console.log("newState", newState);
                    return newState; 
                }        
                case 'ResetVehicleSearch': {
                    var newState = {...state}; 
                    newState["inputVehicleInfoArray"] = newState.inputVehicleInfoArray.map((item) => { return {...item, "searchResult": null}});
                    return newState;
                }
                default:
                    return state;                
            }
        }
        default: 
            return state;
    }    
}

export function useSearchAndPlotVehicleValueReducer(){
    return useReducer(reducer, initialState);
}