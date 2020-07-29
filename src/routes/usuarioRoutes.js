'use strict'

var express = require('express')
var UsuarioController = require('../controllers/usuarioController')
var md_auth = require('../middlewares/authenticated')

//RUTAS TRAZADAS

var api = express.Router();

api.post('/agregar-usuario', UsuarioController.agregarUsuario)
api.put('/editar-usuario/:idUsuario', UsuarioController.editarUsuario)
api.get('/login-usuario',UsuarioController.loginUsuario)
api.get('/listar-usuario', UsuarioController.listarUsuarios)
api.delete('/eliminar-usuario/:idUsuario',UsuarioController.eliminarUsuario)
api.get('/buscar-hotel-calificacion',md_auth.ensureAuth,UsuarioController.buscarHotelCalificacion)
api.get('/listar-hoteles-ordenAscendente',md_auth.ensureAuth, UsuarioController.buscarHotelesAlfabeticamente)
api.get('/listar-hoteles-precio-ascendente',md_auth.ensureAuth, UsuarioController.buscarHotelesPrecioAscendente)
api.get('/listar-hoteles-precio-descendente',md_auth.ensureAuth,UsuarioController.buscarHotelesPrecioDescendente)
api.get('/listar-fechas-disponibles',md_auth.ensureAuth, UsuarioController.rasgosDeFecha)
module.exports = api;