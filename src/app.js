'use strict'

//VARIABLES GLOBALES   
const express = require("express")
const app = express()
const bodyparser = require("body-parser")

//CARGAR RUTAS
var hotel_routes = require('./routes/hotelRoutes')
var usuario_routes = require('./routes/usuarioRoutes')

//MIDDLEWARES  
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

//CABECERAS (Peticiones HTTP)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')

    next();
})

//RUTAS
app.use('/api', hotel_routes)
app.use('/api', usuario_routes)

module.exports = app;