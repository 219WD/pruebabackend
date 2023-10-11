const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar_roles");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { esCursoValido } = require("../helpers/db_validators");

const {
  obtenerCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  borrarCurso,
} = require("../controllers/cursosCtrl");

const router = Router();

router.get("/", obtenerCursos);

router.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  obtenerCurso
);

//ruta post
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearCurso
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  actualizarCurso
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esCursoValido),
    validarCampos,
  ],
  borrarCurso
);

module.exports = router;
