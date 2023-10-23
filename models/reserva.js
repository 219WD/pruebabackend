const { Schema, model } = require("mongoose"); 

const ReservaSchema = Schema({
  nombre: { 
    type: String, 
    required: [true, "El nombre es obligatorio!"], 
    unique: true,
  }, 
  usuario: { 
    type: Schema.Types.ObjectId, 
    ref: "Usuario", 
    required: true,
  }, 
  categoria: { 
    type: Schema.Types.ObjectId, 
    ref: "Categoria", 
    required: true,
  }, 
  estado: {
    type: Boolean,
    default: true,
    requiered: true,
  },
  fecha: { 
    type: Date,
    requiered: true,
  },
  hora: {
    type: String,
    requiered: true,
  },
  precio: { 
    type: Number,
  }, 
  personas: { 
    type: Number, 
    default: 1,
  },
}); 

module.exports = model("Reserva", ReservaSchema);
