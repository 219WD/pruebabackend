const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        // Verificar correo existente
        if (!usuario) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos",
            });
        }

        // Verificar estado del usuario
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario inactivo",
            });
        }

        //Contraseña encriptada
        const validPassword = bcrypt.compareSync(password, usuario.password);
        //Verificar contraseña
        if (!validPassword) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos",
            });
        }

        //Generamos el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login OK",
            token,
            usuario,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Comuníquese con el servicio",
        });
    }
};

module.exports = {
    login,
};
