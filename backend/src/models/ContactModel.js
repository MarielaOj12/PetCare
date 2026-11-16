const {pool} = require('../config/db');
async function create(data) {
  const [result] = await pool.execute('INSERT INTO contact_messages (name,email,phone,subject,message) VALUES (?,?,?,?,?)', [data.name,data.email,data.phone||null,data.subject,data.message]);
  return result.insertId;
}
module.exports={create};
