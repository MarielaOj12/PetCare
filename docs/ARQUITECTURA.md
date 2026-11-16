# Arquitectura y funcionamiento de PetCare

```text
Navegador
  Angular 20 (puerto 4200)
      |
      | HttpClient /api (proxy en desarrollo)
      v
  Node.js / Express 5 (puerto 4000)
      +-- routes/index.js
      +-- controllers (site, contact, appointment, chat)
      +-- middleware (validación, errores, rate limits)
      +-- models (consultas parametrizadas con mysql2)
      |      |
      |      +--> MySQL 8.0+ / practica_vet
      |
      +-- services/ollamaService.js
             |
             +--> http://127.0.0.1:11434/api/chat
                          Gemma 3 (local)
```

## Capa de datos

- `clinic_settings` (1 registro): todos los textos institucionales, historia, dirección, teléfono, video y aviso.
- `services`: catálogo de servicios e iconos.
- `specialties`: especialidades médicas.
- `prices`: precios de referencia, con `service_id` opcional a servicios.
- `gallery`: imágenes, textos alternativos y fuente.
- `business_hours`: horarios publicados.
- `highlights`: pequeñas características de portada.
- `faqs`: preguntas frecuentes. El chatbot recibe sus respuestas como contexto.
- `contact_messages`: mensajes enviados mediante formulario.
- `appointment_requests`: peticiones pendientes, con referencia opcional al servicio.
- `chatbot_logs`: registro técnico de preguntas y respuestas (evita introducir información privada o clínica sensible).

Relación: `services (1) -> (N) prices`, `services (1) -> (N) appointment_requests`.

## Datos editables

El frontend **no contiene datos de la clínica duplicados**: consulta `GET /api/site`. Cambiar texto, precio u horario en MySQL actualiza la página cuando se recarga. Los textos de botones, navegación, avisos del formulario y mensajes del asistente son interfaz, no datos de negocio.

## Chatbot

El servidor envía a Ollama la pregunta, hasta ocho mensajes recientes y contexto actualizado desde MySQL. El modelo se configura con `OLLAMA_MODEL=gemma3:4b`. No existe respuesta simulada en caso de caída del modelo: la API devuelve HTTP 503 con una instrucción de diagnóstico. No se usa un servicio de pago.

## Medidas de seguridad incluidas

- Consultas SQL parametrizadas; validación de campos en backend y formularios en Angular.
- Límite de solicitudes en POST y límite del tamaño de JSON.
- Cabeceras de seguridad mediante Helmet y CORS limitado al origen configurado.
- Credenciales en `.env`, excluidas del repositorio. `backend/.env` se entrega solo como plantilla local sin contraseña.
- No hay panel administrativo público: los datos se editan con MySQL Workbench en esta versión.

## Limitaciones honestas

El proyecto no es un sistema clínico real: no incluye autenticación de operadores, historia clínica, procesamiento de pagos, correos SMTP, calendario transaccional, protección avanzada contra abusos ni una política legal de retención de datos. Las citas se **solicitan**, no se confirman automáticamente. En producción, añadir autenticación, autorización, manejo de secretos, backups, HTTPS, límites de datos y una política de privacidad antes de recibir información de usuarios reales.
