import { handleBatch, getManufacturers, getModels, getModelYear, getAllVehicleInformationShort, getVehicleTypes } from './src/FipeRequests.js';
import { generatePlotData } from './src/GeneratePlotData.js';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

const app = express()
const port = 4000

app.use(cors());

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/ConsultarTipoVeiculos', (req, res) => {
  res.send(getVehicleTypes());
  // res.send([]);
})

app.post('/ConsultarMarcas', (req, res) => {
  getManufacturers(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/ConsultarModelos', (req, res) => {
  getModels(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/ConsultarAnoModelo', (req, res) => {
  getModelYear(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/ConsultarValorComTodosParametros', async (req, res) => {
  const response = await handleBatch(req.body, getAllVehicleInformationShort);
  res.send(response);
})

app.post('/GerarDadosPlot', async (req, res) => {
  const response = await handleBatch(req.body, generatePlotData);
  res.send(response);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})