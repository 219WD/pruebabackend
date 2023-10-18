const { response, request } = require("express");
const reserva = require("../models/Reserva");

const obtenerReservas = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, reservas] = await Promise.all([
    reserva.countDocuments(query),
    reserva.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    reservas,
  });
};

const obtenerReserva = async (req = request, res = response) => {
  const { id } = req.params;

  const reserva = await reserva.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    reserva,
  });
};

const crearReserva = async (req = request, res = response) => {
  const { precio, categoria, img, descripcion } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const reservaDB = await reserva.findOne({ nombre });

  if (reservaDB) {
    res.status(400).json({
      msg: `La reserva ${reservaDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    categoria,
    precio,
    img,
    descripcion,
    img,
    usuario: req.usuario._id,
  };

  const reserva = new reserva(data);

  await reserva.save();

  if (reserva) {
    res.status(201).json({
      reserva,
      msg: "La reserva fue creada con exito!",
    });
  }
};

const actualizarReserva = async (req = request, res = response) => {
  const { id } = req.params;
  const { precio, categoria, descripcion, img, destacado } = req.body;

  const usuario = req.usuario._id;

  const data = {
    precio,
    descripcion,
    categoria,
    img,
    destacado,
    usuario,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const reserva = await reserva.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Reserva actualizada!",
    reserva,
  });
};

const borrarReserva = async (req = request, res = response) => {
  const { id } = req.params;

  const reservaEliminado = await reserva.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: `Reserva eliminada! - ${reservaEliminado}`,
  });
};

module.exports = {
  obtenerReservas,
  obtenerReserva,
  crearReserva,
  actualizarReserva,
  borrarReserva,
};