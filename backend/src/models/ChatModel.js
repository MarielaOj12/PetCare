const {pool}=require('../config/db');
async function save(question,response,model) {
  await pool.execute('INSERT INTO chatbot_logs (question,response,model) VALUES (?,?,?)',[question,response,model]);
}
module.exports={save};
