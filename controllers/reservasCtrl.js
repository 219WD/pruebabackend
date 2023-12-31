const { response, request } = require("express");
const Reserva = require("../models/reserva");

const obtenerReservas = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, reservas] = await Promise.all([
    Reserva.countDocuments(query),
    Reserva.find(query)
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

  const reserva = await Reserva.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    reserva,
  });
};

const crearReserva = async (req = request, res = response) => {
  const { precio, categoria, fecha, hora, personas } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const reservaDB = await Reserva.findOne({ nombre });

  if (reservaDB) {
    res.status(400).json({
      msg: `La reserva ${reservaDB.nombre} ya existe`,
    });
    return;
  }

  const data = {
    nombre,
    categoria,
    estado: true,
    fecha,
    hora,
    precio,
    personas,
    usuario: req.usuario._id,
  };

  const reserva = new Reserva(data);
  await reserva.save();

  res.status(201).json({
    msg: "La reserva fue creada con exito!",
  });



};

const actualizarReserva = async (req = request, res = response) => {
  const { id } = req.params;
  const { precio, categoria, fecha, hora, personas } = req.body;

  const usuario = req.usuario._id;

  const data = {
    precio,
    categoria,
    fecha,
    hora,
    personas,
    usuario,
  };

  if (req.body.nombre) {
    data.nombre = req.body.nombre.toUpperCase();
  }

  const reserva = await Reserva.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Reserva actualizada!",
    reserva,
  });
};

const borrarReserva = async (req = request, res = response) => {
  const { id } = req.params;

  const reservaEliminado = await Reserva.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    reservaEliminado,
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
