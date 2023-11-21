const { Schema, model } = require('mongoose');

const CitaMedicaSchema = new Schema({
  // horasDoctor: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'HorasDoctore',
  //   require: true
  // },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  nombreDoctor:{
    type: String,
    require:true
  },
  fechaDeCita:{
    type: String,
    require:true
  },  
  especialidad: {
    type: String,
    require: true
  },
  hora: {
    type: String,
    require: true
  },
  estado: {
    type: Boolean,
    default: true
  },
});

CitaMedicaSchema.methods.toJSON = function() {
  const { __v, _id,estado,...datos  } = this.toObject();
  datos.uid = _id;

  return datos;
}

module.exports = model('CitasMedica', CitaMedicaSchema);

