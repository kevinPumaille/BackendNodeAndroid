const { Schema, model } = require('mongoose');

const CitaMedicaSchema = new Schema({
  fecha: {
    type: String,
    required: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctore',
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
});

module.exports = model('CitasMedica', CitaMedicaSchema);

