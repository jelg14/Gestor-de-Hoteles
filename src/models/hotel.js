'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    ubicacion: String,
    email: String,
    rol: String,
    calificacion: Number,
    fechaDisponible: Date,
    precio: Number 
})

module.exports= mongoose.model('hotel', HotelSchema)