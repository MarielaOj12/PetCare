const { pool } = require('../config/db');
const fetch = async (sql, args=[]) => (await pool.execute(sql,args))[0];
const one = async (sql,args=[]) => (await fetch(sql,args))[0] || null;
async function getHome() {
  const [clinic,services,specialties,prices,gallery,faqs,hours,highlights] = await Promise.all([
    one('SELECT * FROM clinic_settings ORDER BY id LIMIT 1'),
    fetch('SELECT * FROM services WHERE active=1 ORDER BY sort_order,id'),
    fetch('SELECT * FROM specialties WHERE active=1 ORDER BY sort_order,id'),
    fetch('SELECT p.*,s.name AS service_name FROM prices p LEFT JOIN services s ON s.id=p.service_id WHERE p.active=1 ORDER BY p.sort_order,p.id'),
    fetch('SELECT * FROM gallery ORDER BY sort_order,id'),
    fetch('SELECT * FROM faqs ORDER BY sort_order,id'),
    fetch('SELECT * FROM business_hours ORDER BY sort_order,id'),
    fetch('SELECT * FROM highlights ORDER BY sort_order,id')
  ]);
  return {clinic,services,specialties,prices,gallery,faqs,hours,highlights};
}
module.exports = { getHome, fetch, one };
