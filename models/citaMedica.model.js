const { Schema, model } = require('mongoose');

const CitaMedicaSchema = new Schema({
  horasDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'HorasDoctore',
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  estado: {
    type: Boolean,
    default: true
  },
});

module.exports = model('CitasMedica', CitaMedicaSchema);

