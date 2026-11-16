const app=require('./App');
const {pool}=require('./config/db');
const port=Number(process.env.PORT||4000);
(async()=>{
  try {await pool.query('SELECT 1 FROM clinic_settings LIMIT 1');}
  catch(error){console.error('MySQL no está listo. Revisa backend/.env y ejecuta: npm run db:init');console.error(error.message);process.exit(1);}
  app.listen(port,()=>console.log(`API PetCare: http://localhost:${port} | Salud: http://localhost:${port}/health`));
})();
