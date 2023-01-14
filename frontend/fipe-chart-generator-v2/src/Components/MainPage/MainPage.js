import React from 'react';
import './MainPage.css'
import SearchAndPlotVehicleValue from '../SearchAndPlotVehicleValue/SearchAndPlotVehicleValue';

const MainPage = (props) => {
    return (
        <div className="MainPage">
            <div className="MainPage__Header">Header</div>
            <div className="MainPage__Content">
                {/* <div>Placeholder</div> */}
                <SearchAndPlotVehicleValue />
            </div>
            <div className="MainPage__Footer">Footer</div>
        </div> 
    );
}

export default MainPage;
