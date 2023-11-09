const express = require("express");

//CORS
const cors = require("cors");

//Importar FUNCION BASE DE DATOS
const { dbConnection } = require("../database/config");

class Server {
    constructor() { //Aloja a todas las dependencias que llamamos
        this.app = express(); //En este caso solo a express

        this.port = process.env.PORT; //Puerto

        //Path del login
        this.authPath = "/api/auth";
        //Path de usuarios
        this.usuarioPath = "/api/usuarios";

        //Path de categorias
        this.categoriasPath = "/api/categorias";

        //Path de reservas
        this.reservasPath = "/api/reservas";

        //Buscar
        this.buscarPath = "/api/buscar";

        //Base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }


    middlewares() {
        //Metodos que podemos aplicar entre el pedido y la respuesta
        //CORS
        this.app.use(cors()); //Permiso para bases de datos

        //Recibir datos .json
        this.app.use(express.json());

        this.app.use(express.urlenconded({extended:true}));

        //Mostrar archivos publicos
        this.app.use(express.static("public")); 
    }


    
    //Base de Datos
    async conectarDB() {
        await dbConnection();
    }

    routes() {
        //auth.js
        this.app.use(this.authPath, require("../routes/auth"));
        // usuario.js
        this.app.use(this.usuarioPath, require("../routes/usuarios"));
        //Categorias
        this.app.use(this.categoriasPath, require("../routes/categorias"));
        //Reservas
        this.app.use(this.reservasPath, require("../routes/reservas"));
        //Buscador
        this.app.use(this.buscarPath, require("../routes/buscar"));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log("Server Online", this.port);
        });
    }
}

module.exports = Server;