const { Schema, model } = require('mongoose');

const HorasDoctorSchema = new Schema({
  hora: {
    type: String,
    required: true
  },
  minuto: {
    type: String,
    required: true
  },
  estado: {
      type: Boolean,
      default: true
  },
  doctorFechaDiEs: {
    type: Schema.Types.ObjectId,
    ref: 'DoctorFechaDispoEspec',
    require: true
  },
});

HorasDoctorSchema.methods.toJSON = function() {
  const { __v, _id,estado ,...doctor  } = this.toObject();
  doctor.uid = _id;
  return doctor;
}
                                 
module.exports = model('HorasDoctore', HorasDoctorSchema);