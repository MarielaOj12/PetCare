// Ejecutar con servidor/API levantado: npm run smoke
(async()=>{
  const base=process.env.API_URL||'http://localhost:4000';
  for(const route of ['/health','/api/site','/api/services','/api/specialties','/api/prices','/api/chat/health']){
    const res=await fetch(base+route);
    if(!res.ok)throw new Error(`${route}: HTTP ${res.status}`);
    const payload=await res.json();
    if(!payload.ok)throw new Error(route+' devolvió ok=false');
    console.log('OK',route);
  }
  console.log('Pruebas de lectura correctas. Formularios y modelo Ollama no se invocan para evitar crear registros.');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
