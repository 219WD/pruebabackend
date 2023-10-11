const { Router } = require("express");
//Controlador
const { buscar } = require("../controllers/buscarCtrl");

const router = Router();

router.get("/:coleccion/:termino", buscar);

module.exports = router;
