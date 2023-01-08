import './SearchAndPlotVehicleValue.css';
import { useState } from 'react'
import VehicleSearchPanel from './VehicleSearchPanel/VehicleSearchPanel';
import GraphPlotOptionsPanel from './GraphPlotOptionsPanel/GraphPlotOptionsPanel';
import GraphPlotPanel from './GraphPlotPanel/GraphPlotPanel';


function SearchAndPlotVehicleValue() {

  const [vehicleInformation, setVehicleInformation] = useState(null);
  const [plotOptions, setPlotOptions] = useState(null);

  console.log("vehicleInformation", vehicleInformation);
  console.log("plotOptions", plotOptions);

  return (
    <div className="SearchAndPlotVehicleValue">
      <VehicleSearchPanel vehicleInformation={vehicleInformation} setVehicleInformation={setVehicleInformation} setPlotOptions={setPlotOptions}/>
      {vehicleInformation && <GraphPlotOptionsPanel plotOptions={plotOptions} setPlotOptions={setPlotOptions} />}
      {vehicleInformation && plotOptions && <GraphPlotPanel vehicleInfo={vehicleInformation} plotOptions={plotOptions} />}
    </div>
  );
}

export default SearchAndPlotVehicleValue;
