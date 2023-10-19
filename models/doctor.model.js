const { Schema, model } = require('mongoose');

const DoctorSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidoPaterno: {
    type: String,
    required: true
  },
  apellidoMaterno: {
    type: String,
    required: true
  },
  reseña: {
    type: String,
    required: true
  },
  universidadEstudio: {
    type: String,
    required: true
  },
  gradoEstudio: {
    type: String,
    required: true
  },
  EspecialidadDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'EspecialidadDoctore',
    require: true
}
});

module.exports = model('Doctore', DoctorSchema);

