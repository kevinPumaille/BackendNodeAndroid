const { Schema, model } = require('mongoose');

const FechaDispoEspecSchema = new Schema({
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
  especialidad: {
    type: Schema.Types.ObjectId,
    ref: 'EspecialidadDoctore',
    require: true
  }
});

FechaDispoEspecSchema.methods.toJSON = function() {
  const { __v,estado,_id,especialidad, ...data} = this.toObject();
  data.uid = _id;
  data.especialidad = {
    uid: especialidad._id,
    nombre: especialidad.nombre
  }

  return data;
}
                                 
module.exports = model('FechaDispoEspec', FechaDispoEspecSchema);