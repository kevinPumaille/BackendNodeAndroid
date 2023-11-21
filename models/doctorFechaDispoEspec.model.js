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
  const { __v, _id,estado,doctor,fechaDispoEspec ,...resto  } = this.toObject();

  resto.uid = _id;
  resto.doctor = {
    uid: doctor._id,
    nombre: doctor.nombre,
    especialidad: {
      uid: doctor.especialidad._id,
      nombre: doctor.especialidad.nombre
    }
  }

  resto.fechaDispoEspec = {
    uid: fechaDispoEspec._id,
    mes: fechaDispoEspec.mes,
    dia: fechaDispoEspec.dia,
    anio: fechaDispoEspec.anio,
    especialidad: {
      uid: fechaDispoEspec.especialidad._id,
      nombre: fechaDispoEspec.especialidad.nombre
    }
  }
  return resto;
}

module.exports = model('DoctorFechaDispoEspec', DoctorFechaDispoEspecSchema);