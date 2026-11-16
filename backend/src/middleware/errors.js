function notFound(req,res){res.status(404).json({ok:false,message:'Ruta API no encontrada'});}
function errorHandler(err,req,res,next){
  if(res.headersSent) return next(err);
  if(process.env.NODE_ENV!=='production') console.error('[API]',err.message);
  const status=err.status||500;
  res.status(status).json({ok:false,message:status>=500?'No fue posible completar la solicitud. Revisa el servidor.':err.message});
}
module.exports={notFound,errorHandler};
