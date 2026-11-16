function httpError(status,message) { const error=new Error(message);error.status=status;return error; }
const str=(obj,key,max,min=1) => {
  const value=obj?.[key];
  if(typeof value!=='string') throw httpError(400,`El campo ${key} es obligatorio`);
  const clean=value.trim();
  if(clean.length<min||clean.length>max) throw httpError(400,`El campo ${key} debe tener entre ${min} y ${max} caracteres`);
  return clean;
};
const optionalStr=(obj,key,max) => {
  if(obj?.[key]===undefined||obj[key]===null||obj[key]==='') return '';
  return str(obj,key,max);
};
const email=value=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)&&value.length<=150;
const dateOK=value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value+'T00:00:00')) && new Date(value+'T00:00:00').toISOString().slice(0,10)===value;
function contact(body) {
  const data={name:str(body,'name',120,2),email:str(body,'email',150,5),phone:optionalStr(body,'phone',40),subject:str(body,'subject',160,3),message:str(body,'message',3000,10)};
  if(!email(data.email)) throw httpError(400,'Correo electrónico no válido');
  return data;
}
function appointment(body) {
  const data={ownerName:str(body,'ownerName',120,2),ownerEmail:str(body,'ownerEmail',150,5),ownerPhone:str(body,'ownerPhone',40,6),petName:str(body,'petName',90,2),petType:str(body,'petType',60),serviceId:body?.serviceId||null,preferredDate:str(body,'preferredDate',10),preferredTime:str(body,'preferredTime',5),notes:optionalStr(body,'notes',1500)};
  if(!email(data.ownerEmail))throw httpError(400,'Correo electrónico no válido');
  if(!dateOK(data.preferredDate))throw httpError(400,'Fecha no válida');
  if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.preferredTime))throw httpError(400,'Hora no válida');
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/La_Paz',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const calendar=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  const localToday=`${calendar.year}-${calendar.month}-${calendar.day}`;
  // Validar con calendario boliviano; los horarios publicados son solo de ejemplo.
  if(data.preferredDate<localToday)throw httpError(400,'La fecha de la solicitud no puede ser anterior a hoy');
  if(data.serviceId!==null&&(!Number.isInteger(Number(data.serviceId))||Number(data.serviceId)<1))throw httpError(400,'Servicio no válido');
  data.serviceId=data.serviceId?Number(data.serviceId):null;
  return data;
}
function chat(body){
  const message=str(body,'message',800,1);
  let history=Array.isArray(body?.history)?body.history.slice(-8):[];
  history=history.filter(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,800)}));
  return {message,history};
}
module.exports={httpError,contact,appointment,chat};
