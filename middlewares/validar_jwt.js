const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
    //Obtener token
    const token = req.header("x-token");

    //Verificar token
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion",
        });
    }
    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //OBTENER DATOS DEL USUARIO
        const usuario = await Usuario.findById(uid);

        //Verificar si el usuario existe
        if(!usuario){
            return res.status(401).json({
                msg: "Token no valido, el usuario no existe",
            })
        }
        
        //Verificar estado
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no valido, usuario inactivo",
            });
        }

        //Guardar los datos del usuario
        req.usuario = usuario;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg:"Token no es valido",
        });
    }
};

module.exports = {
    validarJWT,
};