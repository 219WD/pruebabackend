const { Router } = require("express"); //Metodo que trae mas metodos
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categoriasCtrl");
const { esAdminRole } = require("../middlewares/validar_roles");
const { validarJWT } = require("../middlewares/validar_jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar_campos");
const { esCategoriaValido } = require("../helpers/db_validators");

const router = Router();

router.get("/", [validarJWT], obtenerCategorias);

router.get("/:id",
    [
        validarJWT,
        check("id").custom(esCategoriaValido),
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
    ],
    obtenerCategoria,
);


router.post("/",
    [
        validarJWT,
        esAdminRole,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        validarCampos,
    ],
    crearCategoria
);


router.put("/:id",
    [
        validarJWT,
        check("id").custom(esCategoriaValido),
        esAdminRole,
        check("id", "No es un ID valido").isMongoId(),
        check("nombre", "El nombre es obligatorio").notEmpty(),
        validarCampos,
    ],
    actualizarCategoria
);


router.delete("/:id",
    [
        validarJWT,
        check("id").custom(esCategoriaValido),
        esAdminRole,
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
    ],
    borrarCategoria
);
module.exports = router;