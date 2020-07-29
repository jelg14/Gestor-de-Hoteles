'user strict'

var Hotel = require('../models/hotel')
var jwt = require('../services/jwt')
var Usuario = require('../models/usuario')

function agregarUsuario(req, res) {
    var usuario = new Usuario();
    var params = req.body;

    if (params.nombre) {
        usuario.nombre = params.nombre;
        usuario.email = params.email;
        usuario.rol = 'ROLE_USUARIO';

        Usuario.find({$or:[{nombre: usuario.nombre},{email: usuario.email}]}, (err, usuarios)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion'})
            if(usuarios && usuarios.length >=1){
                return res.status(500).send({message:'El usuario ya existe'})
            }else{
                usuario.save((err, usuarioRegistrado)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion de registro'})

                    return res.status(200).send({Usuario: usuarioRegistrado})
                })
            }

        })

    } else {
        return res.status(500).send({message: 'Ingrese todos los datos correspondientes'})
    }
}

function loginUsuario(req, res) {
    var params = req.body

    Usuario.findOne({ nombre: params.nombre },{email: params.email} ,(err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (usuario) {
            console.log(usuario)
            if (params.gettoken) {
                return res.status(200).send({
                    token: jwt.createToken(usuario)
                })
            } else {
                return res.status(200).send({ user: usuario });
            }
        } else {
            return res.status(404).send({ message: 'no se ha podido loguear' })
        }
    })
}

function editarUsuario(req, res) {
    var usuarioId = req.params.idUsuario;
    var params = req.body;

    Usuario.findByIdAndUpdate(usuarioId, params, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion de actualizacion'})
        if(!usuarioEditado) return res.status(404).send({message: 'No fue posible encontrar el usuario'})

        return res.status(200).send({Usuario: usuarioEditado})

    })
}

function eliminarUsuario(req, res) {
    var usuarioId = req.params.idUsuario;

    Usuario.findByIdAndDelete(usuarioId, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})
        if(!usuarioEliminado)return res.status(404).send({message: 'No fue posible encontrar el usuario'})

        return res.status(200).send({Se_ha_eliminado_el_siguiente_usuario: usuarioEliminado})
    })
}

function listarUsuarios(req, res) {
    Usuario.find({}, (err, usuarios)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Usuarios: usuarios})
    })
}

function buscarHotelCalificacion(req, res) {
    var calificacion = req.body.calificacion

    Hotel.find({calificacion: calificacion}, (err, hoteles)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Hoteles_disponibles: hoteles})
    })
}

function buscarHotelesAlfabeticamente(req, res) {
    Hotel.find({}).sort({nombre: 1}).exec((err, hoteles)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Hoteles: hoteles})
    })
}

function buscarHotelesPrecioAscendente(req, res) {
    Hotel.find({}).sort({precio: 1}).exec((err, hoteles)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Hoteles: hoteles})
    })
}

function buscarHotelesPrecioDescendente(req, res) {
    Hotel.find({}).sort({precio: -1}).exec((err, hoteles)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Hoteles: hoteles})
    })
}

function rasgosDeFecha(req, res) {
    var fechaIngreso = req.body.fechaIngreso;
    var fechaSalida = req.body.fechaSalida;

    Hotel.find({fechaDisponible:{$gte: fechaIngreso, $lte:fechaSalida}},(err, hoteles)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Hoteles_disponibles: hoteles})
    })

}



module.exports = {
    agregarUsuario,
    loginUsuario,
    editarUsuario,
    eliminarUsuario,
    listarUsuarios,
    buscarHotelCalificacion,
    buscarHotelesAlfabeticamente,
    buscarHotelesPrecioAscendente,
    buscarHotelesPrecioDescendente,
    rasgosDeFecha
}