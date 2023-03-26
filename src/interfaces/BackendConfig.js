const config = {
    BACKEND_SERVICE_NAME: process.env.REACT_APP_BACKEND_SERVICE_NAME || 'localhost',
    BACKEND_SERVICE_PORT: process.env.REACT_APP_BACKEND_SERVICE_PORT || 4000,
    routes: {
        getVehicleTypes: "/ConsultarTipoVeiculos",
        SearchManufacturer: "/ConsultarMarcas",
        SearchModels: "/ConsultarModelos",
        SearchModelYears: "/ConsultarAnoModelo",
        getVehicleInformation: "/ConsultarValorComTodosParametros",
        getPlotData: "/GerarDadosPlot"
    }
}

export default config;

