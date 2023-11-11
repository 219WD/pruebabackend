const { Router } = require("express"); //Metodo que trae mas metodos

//Importamos Expressvalidators
const { check } = require("express-validator");

//Funcion validar campos
const { validarCampos } = require("../middlewares/validar_campos");

//Importar funciones de controlador
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require("../controllers/usuariosCtrl");

//Validaciones de la base de datos
const { esMailValido, esRolValido, esIdValido } = require("../helpers/db_validators");

//ExpressValidators
const { validarJWT } = require("../middlewares/validar_jwt");
const { esAdminRole } = require("../middlewares/validar_roles");

const router = Router(); //Guardamos router en una variable


//Peticion GET: Para enviar datos

router.get("/",
    [
        // Validar JWT
        validarJWT,
        // Validar rol de administrador
        esAdminRole
    ],
    usuariosGet
);

//Peticion GET: Para enviar datos

router.get("/:id",
    [
        //Validar JWT
        validarJWT,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(esIdValido),
    ],
    usuariosGet);

//Peticion Post: Para recibir datos

router.post("/",
    [
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("password", "La contraseña debe tener como minimo 6 caracteres"
        ).isLength({ minLength: 6 }),
        check("correo", "No es un correo valido").isEmail(),
        check("correo").custom(esMailValido),
        check("rol").custom(esRolValido),
        validarCampos,
    ],
    usuariosPost
);

//Peticion Put: Para modificar o actualizar datos

router.put("/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(esIdValido),
        validarCampos,
    ],
    usuariosPut
);

//Peticion Delete: Para borrar datos

router.delete("/:id",
    [
        //Validar JWT
        validarJWT,
        //Validar rol
        esAdminRole,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(esIdValido),
        validarCampos,
    ],
    usuariosDelete
);

module.exports = router;

