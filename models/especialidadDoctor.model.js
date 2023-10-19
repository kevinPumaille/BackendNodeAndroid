const { Schema, model } = require('mongoose');

const EspecialidadDoctorSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  mes: {
    type: String,
    required: true
  },
  dia: {
    type: String,
    required: true
  },
  anio: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
},
});

EspecialidadDoctorSchema.methods.toJSON = function() {
  const { __v, _id,estado ,...resto  } = this.toObject();
  resto.uid = _id;
  return resto;
}

module.exports = model('EspecialidadDoctore', EspecialidadDoctorSchema);

