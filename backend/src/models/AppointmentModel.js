const {pool}=require('../config/db');
async function create(data) {
  const [result]=await pool.execute('INSERT INTO appointment_requests (owner_name,owner_email,owner_phone,pet_name,pet_type,service_id,preferred_date,preferred_time,notes) VALUES (?,?,?,?,?,?,?,?,?)', [data.ownerName,data.ownerEmail,data.ownerPhone,data.petName,data.petType,data.serviceId||null,data.preferredDate,data.preferredTime,data.notes||null]);
  return result.insertId;
}
async function validService(id) {
  if(!id) return true;
  const [[row]]=await pool.execute('SELECT COUNT(*) AS total FROM services WHERE id=? AND active=1',[id]);
  return row.total>0;
}
module.exports={create,validService};
