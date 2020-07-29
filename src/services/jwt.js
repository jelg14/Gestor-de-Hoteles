'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'clave_secreta_2018169'

exports.createToken = function(user) {

    var payload = {
        sub: user._id,
        nombre: user.nombre,
        ubicacion: user.ubicacion,
        email: user.email,
        rol: user.rol,
        calificacion: user.calificacion,
        fechaDisponible: user.fechaDisponible,
        precio: user.precio,
        iat: moment().unix(),
        exp: moment().day(30, 'days').unix()
    }
    return jwt.encode(payload, secret)
}
