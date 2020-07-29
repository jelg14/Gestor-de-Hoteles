'use strict'

var express = require('express')
var HotelController = require('../controllers/hotelController')
var md_auth = require('../middlewares/authenticated')


//RUTAS TRAZADAS

var api = express.Router();
api.post('/agregar-hotel', HotelController.agregarHotel)
api.put('/editar-hotel/:idHotel',md_auth.ensureAuth, HotelController.editarHotel)
api.delete('/eliminar-hotel/:idHotel',md_auth.ensureAuth, HotelController.eliminarHotel)
api.get('/login-hotel',HotelController.loginHotel)
api.get('/listar-hoteles',HotelController.listarHoteles)
module.exports = api;