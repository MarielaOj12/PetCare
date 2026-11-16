const Appointment=require('../models/AppointmentModel');
const {appointment,httpError}=require('../middleware/validate');
exports.create=async(req,res)=>{
  const data=appointment(req.body);
  if(!await Appointment.validService(data.serviceId))throw httpError(400,'El servicio seleccionado no está disponible');
  const id=await Appointment.create(data);
  res.status(201).json({ok:true,id,message:'Solicitud registrada. La cita está PENDIENTE y requiere confirmación por la veterinaria.'});
};
