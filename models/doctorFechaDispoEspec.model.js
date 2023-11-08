const { Schema, model } = require('mongoose');

const DoctorFechaDispoEspecSchema = new Schema({
  estado: {
      type: Boolean,
      default: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctore',
    require: true
  },
  fechaDispoEspec: {
    type: Schema.Types.ObjectId,
    ref: 'FechaDispoEspec',
    require: true
  }
});
       
DoctorFechaDispoEspecSchema.methods.toJSON = function() {
  const { __v, _id,estado ,...resto  } = this.toObject();
  resto.uid = _id;
  return resto;
}

module.exports = model('DoctorFechaDispoEspec', DoctorFechaDispoEspecSchema);