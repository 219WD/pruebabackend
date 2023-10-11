//Estructura base para usar el Backend
const Server = require("./models/server"); //Importamos server
require("dotenv").config();

const server = new Server(); //Variable para guardar todos los metodos de server

server.listen();