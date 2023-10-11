const { response, request } = require("express");
const Curso = require("../models/curso");

const obtenerCursos = async (req = request, res = response) => {
  const { desde = 0, limite = 0 } = req.query;
  const query = { estado: true };

  const [total, cursos] = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    cursos,
  });
};

const obtenerCurso = async (req = request, res = response) => {
  const { id } = req.params;

  const curso = await Curso.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    curso,
  });
};

const crearCurso = async (req = request, res = response) => {
  const { precio, categoria, img, descripcion } = req.body;
  const nombre = req.body.nombre.toUpperCase();

  const cursoDB = await Curso.findOne({ nombre });

  if (cursoDB) {
    res.status(400).json({
      msg: `El curso ${cursoDB.nombre} ya existes`,
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

  const curso = new Curso(data);

  await curso.save();

  if (curso) {
    res.status(201).json({
      curso,
      msg: "El curso fue creado con exito!",
    });
  }
};

const actualizarCurso = async (req = request, res = response) => {
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

  const curso = await Curso.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Curso actualizado!",
    curso,
  });
};

const borrarCurso = async (req = request, res = response) => {
  const { id } = req.params;

  const cursoEliminado = await Curso.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: `Curso eliminado! - ${cursoEliminado}`,
  });
};

module.exports = {
  obtenerCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  borrarCurso,
};
