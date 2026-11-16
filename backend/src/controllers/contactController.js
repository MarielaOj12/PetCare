const Contact=require('../models/ContactModel');
const {contact}=require('../middleware/validate');
exports.create=async(req,res)=>{ const data=contact(req.body); const id=await Contact.create(data); res.status(201).json({ok:true,id,message:'Mensaje recibido. Nos pondremos en contacto cuando haya atención disponible.'}); };
