import { useReducer } from "react";
import VehicleSearchPanelDefaults from "./VehicleSearchPanelDefaults";
import produce from "immer";

const initialState = {
    "inputVehicleInfoArray": [{id: 0}],
    "plotOptions": {},
    "plotDataArray": [{id: 0}],
    "plotDataLabels": []
}

const reducer = produce((state, action) => {

    console.log("Reducer Start");
    console.log({action});
    
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
                    const availableIds = [...Array(VehicleSearchPanelDefaults().MAX_SEARCH_INSTANCES).keys()].filter((id) => !inUseIds.includes(id));                    
                    
                    if (availableIds.length === 0) {
                        return state; 
                    }
        
                    const newInstanceId = Math.min(...availableIds);                    
                    
                    state.inputVehicleInfoArray.push({
                        "id": newInstanceId
                    });                    
                    state.plotDataArray.push({
                        "id": newInstanceId
                    });                    
                    return state;
                }
                case 'RemoveVehicleSearchInstance': {
                    
                    state["inputVehicleInfoArray"] = state.inputVehicleInfoArray.filter((item) => item.id !== action.id );
                    return state;
                }
                case 'UpdateInputVehicleInfoInstance': {
                    const {id, type, subtype, ...data} = action 

                    state["inputVehicleInfoArray"] = state.inputVehicleInfoArray.map((item) => {
                        if (item.id === action.id){
                            item = {...item, ...data}
                        }
                        return item
                    });                    
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
                case 'UpdatePlotDataInstance': {
                    const {id, type, subtype, ...data} = action 

                    state["plotDataArray"] = state.plotDataArray.map((item) => {
                        if (item.id === action.id){
                            item = {...item, ...data}
                        }
                        return item
                    });                    
                    return state; 
                }
                case 'ResetPlotData': {
                    state.plotDataArray = state.plotDataArray.map((item) => { return {...item, monthArray: null, valueArray: null}});
                    return state
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