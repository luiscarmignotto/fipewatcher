import './App.css';
import VehicleSearchPanel from './Components/SearchVehicleTools/VehicleSearchPanel/VehicleSearchPanel';

const vehicleSearchPanelStyle = {
  "heigth": "50%"
}

function App() {
  return (
    <div className="App">
      <VehicleSearchPanel style={vehicleSearchPanelStyle}/>
    </div>
  );
}

export default App;
