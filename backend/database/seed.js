require('dotenv').config();
const { pool } = require('../src/config/db');
const pexels = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`;
const settings = {
  clinic_name: 'PetCare · Clínica Veterinaria', short_name: 'PetCare', eyebrow: 'CUIDADO VETERINARIO CERCANO',
  hero_title: 'Cuidamos a quienes llenan tu vida de alegría.',
  hero_subtitle: 'Atención veterinaria integral, profesional y llena de cariño para tus compañeros de vida.',
  slogan: 'Su bienestar es nuestra forma de querer.', about_title: 'Cuidamos de ellos como parte de tu familia.',
  about_text: 'En PetCare reunimos medicina preventiva, atención clínica y acompañamiento cercano. Queremos que cada visita sea tranquila, clara y respetuosa con los animales y sus familias.',
  story: 'PetCare es una clínica ficticia creada como demostración académica de una plataforma veterinaria. Su historia, servicios, horarios, equipo y tarifas son datos de ejemplo editables desde MySQL.',
  mission: 'Ofrecer orientación responsable y una atención centrada en el bienestar animal, la prevención y la comunicación con cada familia.',
  address: 'Dirección por configurar · Cochabamba, Bolivia', city: 'Cochabamba, Bolivia',
  phone: '+591 000 00000 (demostración)', email: 'hola@petcare.demo', instagram: '',
  founded_year: 'Proyecto académico', emergency_note: 'Si tu mascota presenta una emergencia, acude a un centro veterinario presencial.',
  demo_notice: 'Sitio de demostración académica: nombre, dirección, teléfono, testimonios, horarios y precios son ilustrativos.',
  hero_video: '/assets/animales.mp4',
  pexels_video_url: 'https://videos.pexels.com/video-files/4166347/4166347-uhd_3840_2160_30fps.mp4',
  pexels_video_source: 'https://www.pexels.com/video/dog-running-in-the-grass-field-4166347/',
  hero_poster: '/assets/poster-animales.jpg'
};
const services = [
  ['Consulta general', 'Evaluación integral, historia clínica, orientación y seguimiento.', 'stethoscope', pexels(6235650), '30–45 min', 1],
  ['Vacunación', 'Plan de inmunización según especie, edad y antecedentes.', 'syringe', pexels(6816858), '20–30 min', 1],
  ['Desparasitación', 'Prevención y tratamiento antiparasitario bajo criterio profesional.', 'shield', pexels(6234618), '20 min', 0],
  ['Laboratorio clínico', 'Apoyo diagnóstico con análisis de muestras y resultados.', 'flask', pexels(7469212), 'Según prueba', 1],
  ['Cirugía veterinaria', 'Valoración prequirúrgica, procedimientos y cuidados posteriores.', 'heart', pexels(7469233), 'Según procedimiento', 0],
  ['Odontología', 'Revisión bucodental, profilaxis y orientación de higiene.', 'smile', pexels(6816859), '45–90 min', 0],
  ['Ecografía', 'Estudio por imagen complementario a la valoración clínica.', 'activity', pexels(7470752), '30–60 min', 0],
  ['Dermatología', 'Evaluación de piel, pelo, oído y posibles alergias.', 'sparkles', pexels(7469228), '30–45 min', 0],
  ['Nutrición', 'Orientación alimentaria y control de condición corporal.', 'leaf', pexels(6235650), '30 min', 0],
  ['Geriatría', 'Controles preventivos para mascotas adultas mayores.', 'sun', pexels(7469216), '40 min', 0],
  ['Hospitalización', 'Seguimiento de pacientes que requieren cuidados continuos.', 'plus', pexels(7469233), 'Según indicación', 0],
  ['Control de cachorros', 'Primera revisión, crecimiento y recomendaciones de crianza.', 'paw', pexels(6816858), '30 min', 0]
];
const specialties = [
  ['Medicina interna', 'Evaluación de trastornos complejos y planes de estudio individualizados.', pexels(6235650), 'heart'],
  ['Cirugía de tejidos blandos', 'Atención quirúrgica según evaluación y disponibilidad.', pexels(7469233), 'cross'],
  ['Dermatología', 'Cuidado de la piel, alergias y problemas del pelaje.', pexels(6816859), 'leaf'],
  ['Diagnóstico por imagen', 'Ecografía y exploraciones complementarias cuando están indicadas.', pexels(7470752), 'activity']
];
const prices = [
  [1, 'Consulta general', 'Revisión clínica y recomendaciones.', 80, 'por consulta', 1],
  [2, 'Vacunación básica', 'Servicio orientativo; el biológico puede variar.', 95, 'desde', 0],
  [3, 'Desparasitación', 'Precio variable según especie y peso.', 45, 'desde', 0],
  [4, 'Exámenes de laboratorio', 'Pruebas diagnósticas según indicación.', 120, 'desde', 0],
  [6, 'Limpieza dental', 'Sujeta a valoración previa.', 250, 'desde', 0],
  [7, 'Ecografía abdominal', 'Valoración por imagen programada.', 160, 'desde', 1]
];
const gallery = [
  [pexels(6235650), 'Veterinario examinando a un perro en consulta', 'Cuidado en cada consulta', 'https://www.pexels.com/photo/a-dog-at-the-clinic-6235650/'],
  [pexels(6816859), 'Gato recibiendo una revisión veterinaria', 'Pacientes felinos', 'https://www.pexels.com/photo/cat-at-the-veterinarian-6816859/'],
  [pexels(7469212), 'Profesionales revisando a un perro', 'Acompañamiento cercano', 'https://www.pexels.com/photo/volunteers-checking-on-a-dog-7469212/'],
  [pexels(6234618), 'Perro en mesa de exploración veterinaria', 'Bienestar y prevención', 'https://www.pexels.com/photo/a-veterinarian-sitting-beside-a-black-dog-lying-on-the-table-6234618/']
];
const faqs = [
  ['¿Necesito una cita?', 'Recomendamos solicitarla por el formulario de esta web. Una solicitud no confirma automáticamente la atención.'],
  ['¿Atienden emergencias?', 'Este sitio es de demostración. Ante una urgencia real, acude directamente a un centro veterinario operativo.'],
  ['¿Cuánto cuesta una consulta?', 'En la sección de precios hay valores ilustrativos en bolivianos. Confirma el importe real con la clínica.'],
  ['¿Puedo llevar a mi gato?', 'El catálogo de ejemplo contempla atención para perros y gatos; la disponibilidad debe confirmarse.'],
  ['¿El chatbot puede diagnosticar?', 'No. El asistente da información sobre la clínica y orientación general; no reemplaza una valoración veterinaria.']
];
async function insertRows(conn, table, columns, rows) {
  const [[{ total }]] = await conn.query(`SELECT COUNT(*) AS total FROM ${table}`);
  if (total > 0) return;
  const sql = `INSERT INTO ${table} (${columns.map(c => '`'+c+'`').join(',')}) VALUES (${columns.map(() => '?').join(',')})`;
  for (const row of rows) await conn.execute(sql, row);
}
async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [[{total}]] = await conn.query('SELECT COUNT(*) AS total FROM clinic_settings');
    if (!total) await conn.execute(`INSERT INTO clinic_settings (${Object.keys(settings).map(k=> '`'+k+'`').join(',')}) VALUES (${Object.keys(settings).map(()=> '?').join(',')})`, Object.values(settings));
    await insertRows(conn, 'services', ['name','description','icon','image_url','duration','featured','sort_order'], services.map((x,i) => [...x,i+1]));
    await insertRows(conn, 'specialties', ['name','description','image_url','icon','sort_order'], specialties.map((x,i) => [...x,i+1]));
    await insertRows(conn, 'prices', ['service_id','label','description','amount','unit','featured','sort_order'], prices.map((x,i) => [...x,i+1]));
    await insertRows(conn, 'gallery', ['image_url','alt_text','caption','source_url','sort_order'], gallery.map((x,i) => [...x,i+1]));
    await insertRows(conn, 'faqs', ['question','answer','sort_order'], faqs.map((x,i) => [...x,i+1]));
    await insertRows(conn, 'business_hours', ['day_name','opening','sort_order'], [
      ['Lunes a viernes','08:30 – 18:30',1], ['Sábados','09:00 – 13:00',2], ['Domingos','Cerrado',3]
    ]);
    await insertRows(conn, 'highlights', ['value','label','sort_order'], [
      ['01','Atención cercana',1],['02','Prevención responsable',2],['03','Acompañamiento familiar',3]
    ]);
    await conn.commit();
    console.log('Datos de demostración cargados (sin duplicados).');
  } catch (error) { await conn.rollback(); throw error; }
  finally { conn.release(); await pool.end(); }
}
if (require.main === module) seed().catch(e => {console.error(e.message); process.exitCode=1;});
module.exports = {seed};
