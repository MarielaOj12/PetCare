SHOW TABLES;
SELECT * FROM clinic_settings;
SELECT id,name,description FROM services ORDER BY sort_order;
SELECT id,name FROM specialties;
SELECT id,label,amount,currency FROM prices;
SELECT id,name,email,subject,message,created_at FROM contact_messages ORDER BY id DESC;
SELECT id,owner_name,pet_name,preferred_date,preferred_time,status FROM appointment_requests ORDER BY id DESC;
SELECT id,question,response,model,created_at FROM chatbot_logs ORDER BY id DESC;
