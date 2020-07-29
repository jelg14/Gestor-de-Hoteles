'user strict'

var Hotel = require('../models/hotel')
var jwt = require('../services/jwt')

function agregarHotel(req, res) {
    var hotel = new Hotel()
    var params = req.body;
    
    if (params.nombre && params.ubicacion && params.email && params.calificacion) {
        hotel.nombre = params.nombre;
        hotel.ubicacion = params.ubicacion;
        hotel.email = params.email;
        hotel.calificacion = params.calificacion;
        hotel.fechaDisponible = params.fechaDisponible;
        hotel.precio = params.precio;
        hotel.rol = 'ROLE_HOTEL'

        Hotel.find({$or:[{nombre: hotel.nombre},{email: hotel.email}]},(err, hoteles)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion'})
            if (hoteles && hoteles.length >= 1) {
                return res.status(500).send({message: 'El hotel ya existe'})
            } else {
                hotel.save((err, hotelRegistrado)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion de registro'})

                    return res.status(200).send({Hotel: hotelRegistrado})
                })
            }
        })
    } else {
        return res.status(500).send({message: 'Ingrese todos los datos correspondientes'})
    }
}

function loginHotel(req, res) {
    var params = req.body

    Hotel.findOne({ nombre: params.nombre },{email: params.email} ,(err, empresa) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (empresa) {
            console.log(empresa)
            if (params.gettoken) {
                return res.status(200).send({
                    token: jwt.createToken(empresa)
                })
            } else {
                return res.status(200).send({ user: usuario });
            }
        } else {
            return res.status(404).send({ message: 'no se ha podido loguear' })
        }
    })
}

function editarHotel(req, res) {
    var hotelId = req.params.idHotel
    var params = req.body
   
  
        Hotel.findByIdAndUpdate(hotelId, params,{new: true}, (err, hotelActualizado)=>{
         
            if(err) return res.status(500).send({message: 'Error en la peticion de actualizacion'})
            if(!hotelActualizado) return res.status(404).send({message: 'El hotel no fue encontrado'})
            
            return res.status(200).send({Hotel_actualizado: hotelActualizado})
    
        })
    
   

}

function eliminarHotel(req, res) {
    var hotelId = req.params.idHotel
   
        Hotel.findByIdAndDelete(hotelId, (err, HotelEliminado)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de actualizacion'})
            if(!HotelEliminado) return res.status(404).send({message: 'El hotel no fue encontrado'})

            return res.status(200).send({Se_ha_eliminado_el_siguiente_hotel: HotelEliminado})
    })
}
    


function listarHoteles(req, res) {
    Hotel.find({}, (err, hoteles)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'})

        return res.status(200).send({Hoteles_disponibles: hoteles})
    })
}



module.exports = {
    agregarHotel,
    loginHotel,
    editarHotel,
    eliminarHotel,
    listarHoteles
}