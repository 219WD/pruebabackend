const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
    //Propiedades
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    //Usuario que crea la categoria
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
});

module.exports = model("Categoria", CategoriaSchema);