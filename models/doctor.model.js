const { Schema, model } = require('mongoose');

const DoctorSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },  
  especialidad: {
    type: Schema.Types.ObjectId,
    ref: 'EspecialidadDoctore',
    require: true
}
});

DoctorSchema.methods.toJSON = function() {
  const { __v, _id,estado ,...doctor  } = this.toObject();
  doctor.uid = _id;
  return doctor;
}

module.exports = model('Doctore', DoctorSchema);

