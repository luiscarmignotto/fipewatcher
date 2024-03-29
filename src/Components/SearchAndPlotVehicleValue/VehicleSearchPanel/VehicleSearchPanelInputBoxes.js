import { React } from 'react';

import GetVehicleType from './GetVehicleType';
import SearchManufacturer from './SearchManufacturer';
import SearchModel from './SearchModel';
import SearchModelYear from './SearchModelYear';
import GetReferenceTableId from './GetReferenceTableId';

import '../css/VehicleSelectionPanel.css'
import ActionButton from '../../Common/ActionButton';

const VehicleSearchPanelInputBoxes = ({ state, dispatch, id }) => {

    // console.log("VehicleSearchPanelInputBoxes", inputVehicleInfo)

    const inputVehicleInfo = state.inputVehicleInfoArray.find((item) => item.id === id);

    function removeSearchInstance(id){
        dispatch({
            type: "VehicleSearchPanel",
            subtype: "RemoveVehicleSearchInstance",
            id
        })
    }

    return (
        <div className="VehicleSelectionPanel__Content--InputBoxesContainer">     
            {<div>Veículo {id}</div>}
            <GetReferenceTableId inputVehicleInfo={inputVehicleInfo} dispatch={dispatch}/>
            { inputVehicleInfo.referenceTableId &&
                <GetVehicleType inputVehicleInfo={inputVehicleInfo} dispatch={dispatch}/>
            }
        
            { inputVehicleInfo.referenceTableId && inputVehicleInfo.vehicleType && 
                <SearchManufacturer inputVehicleInfo={inputVehicleInfo} dispatch={dispatch}/>
            }
            { inputVehicleInfo.referenceTableId && inputVehicleInfo.vehicleType && inputVehicleInfo.manufacturer && 
                <SearchModel inputVehicleInfo={inputVehicleInfo} dispatch={dispatch} />
            }
            { inputVehicleInfo.referenceTableId && inputVehicleInfo.vehicleType && inputVehicleInfo.manufacturer && inputVehicleInfo.model && 
                <SearchModelYear inputVehicleInfo={inputVehicleInfo} dispatch={dispatch}/>
            }  
            {state.inputVehicleInfoArray.length > 1 && 
                <ActionButton onClick={() => {removeSearchInstance(id)}} text="Remover Instância"/>
            }         
        </div>
    );
}

export default VehicleSearchPanelInputBoxes;
