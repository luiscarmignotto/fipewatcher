import { GetManufacturers, GetModels, GetModelYear, GetAllVehicleInformationShort, getVehicleTypes } from './src/FipeRequests.js';
import { GeneratePlotData } from './src/GeneratePlotData.js';

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
  res.send(getVehicleTypes())
})

app.post('/ConsultarMarcas', (req, res) => {
  console.log("RequestBody: ", req.body)
  GetManufacturers(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/ConsultarModelos', (req, res) => {
  GetModels(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/ConsultarAnoModelo', (req, res) => {
  GetModelYear(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/ConsultarValorComTodosParametros', (req, res) => {
  GetAllVehicleInformationShort(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.post('/GerarDadosPlot', (req, res) => {
  GeneratePlotData(req.body)
    .then(
      (response) => {
        res.send(response)
      }
    );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})