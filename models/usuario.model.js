const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
  dniUsuario: {
    type: Number,
    required: true
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  apellidoUsuario: {
    type: String,
    required: true
  },
  correoUsuario: {
    type: String,
    require:true
  },
  claveUsuario: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: false,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
      type: Boolean,
      default: true
  },
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, claveUsuario,_id, estado,...usuario  } = this.toObject();
  usuario.uid = _id;
  return usuario;
}
                                 
module.exports = model('Usuario', UsuarioSchema);