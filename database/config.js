const mongoose = require("mongoose");


const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Base de datos conectada");
    }catch(error){
        console.log(error);
        throw new Error("Error en el inicio de la bd");
    }
};

module.exports = {
    dbConnection,
}