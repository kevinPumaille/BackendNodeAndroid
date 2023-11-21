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
  const { __v, _id,estado ,...data  } = this.toObject();
  data.uid = _id;
  
  // data.doctorFechaDiEs = {
  //   uid: doctorFechaDiEs._id,
  //   doctor: {
  //     uid: doctorFechaDiEs.doctor,
  //     nombre: doctorFechaDiEs.doctor.nombre,
  //     especialidad: {
  //       uid: doctorFechaDiEs.doctor.especialidad._id,
  //       nombre: doctorFechaDiEs.doctor.especialidad.nombre
  //     }
  //   },
  //   fechaDispoEspec: {
  //     uid: doctorFechaDiEs.fechaDispoEspec._id,
  //     mes: doctorFechaDiEs.fechaDispoEspec.mes,
  //     dia: doctorFechaDiEs.fechaDispoEspec.dia,
  //     anio: doctorFechaDiEs.fechaDispoEspec.anio,
  //     especialidad: {
  //       uid: doctorFechaDiEs.fechaDispoEspec.especialidad._id,
  //       nombre: doctorFechaDiEs.fechaDispoEspec.especialidad.nombre
  //     }
  //   }
  // }
  return data;
}
                                 
module.exports = model('HorasDoctore', HorasDoctorSchema);