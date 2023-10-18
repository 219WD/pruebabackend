const Usuario = require("../models/usuario");
const Rol = require("../models/rol");
const Categoria = require("../models/categoria");
const Reserva = require("../models/reserva");

//Funcion para validar usuario por el mail
const esMailValido = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
};

//Funcion para encontrar el rol en la db
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
};

//Funcion para encontrar ID valido
const esIdValido = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) { //si no encuentra el usuario
        throw new Error(`El ID ${id} no se encuentra en la base de datos`)
    }
};

//Categoria existe
const esCategoriaValido = async (id) => {
    const existeCategoria = await categoria.findById(id);

    if(!existeCategoria){
        throw new Error(`La categoria ${id} no existe en la base de datos`);
    }
};

//Reserva existe?
const esReservaValido = async (id) => {
    const existeReserva = await Reserva.findById(id);
  
    if (!existeReserva) {
      throw new Error(`El Id ${id} no corresponde a una Reserva existente!`);
    }
  };
  
  module.exports = {
    esMailValido,
    esRolValido,
    esIdValido,
    esCategoriaValido,
    esReservaValido,
  };
  