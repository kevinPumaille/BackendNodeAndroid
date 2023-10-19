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
  apellidoPaternoUsuario: {
    type: String,
    required: true
  },
  apellidoMaternooUsuario: {
    type: String,
    required: true
  },
  sexoUsuario: {
    type: String,
    required: true
  },
  fechaNacimientoUsuario: {
    type: String,
    required: true
  },
  correoUsuario: {
    type: String,
    require:true
  },
  telefonoUsuario: {
    type: String,
    required: true
  },
  claveUsuario: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
      type: Boolean,
      default: true
  },
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, claveUsuario,_id ,...usuario  } = this.toObject();
  usuario.uid = _id;
  return usuario;
}
                                 
module.exports = model('Usuario', UsuarioSchema);