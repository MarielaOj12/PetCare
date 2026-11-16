# API REST

Base URL en desarrollo: `http://localhost:4000`.

| Método | Ruta | Finalidad | Fuente / destino |
|---|---|---|---|
| GET | `/health` | Salud del backend y MySQL | MySQL |
| GET | `/api/site` | Todos los datos usados en la página | MySQL (8 tablas) |
| GET | `/api/services` | Servicios | `services` |
| GET | `/api/specialties` | Especialidades | `specialties` |
| GET | `/api/prices` | Precios | `prices` |
| GET | `/api/about` | Institución | `clinic_settings` |
| GET | `/api/gallery` | Galería | `gallery` |
| GET | `/api/faqs` | Preguntas frecuentes | `faqs` |
| POST | `/api/contact` | Guardar formulario | `contact_messages` |
| POST | `/api/appointments` | Crear SOLICITUD pendiente | `appointment_requests` |
| GET | `/api/chat/health` | Comprueba Ollama y presencia del modelo | Ollama |
| POST | `/api/chat` | Pregunta a Gemma 3 y guarda log | MySQL + Ollama |

### Contacto

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Ana Pérez",
  "email": "ana@example.com",
  "phone": "+591 70000000",
  "subject": "Consulta general",
  "message": "Quisiera consultar los días de atención disponibles."
}
```

Respuesta 201: `{"ok":true,"id":1,"message":"Mensaje recibido..."}`.

### Citas

```http
POST /api/appointments
Content-Type: application/json

{
  "ownerName": "Ana Pérez",
  "ownerEmail": "ana@example.com",
  "ownerPhone": "+591 70000000",
  "petName": "Luna",
  "petType": "Perro",
  "serviceId": 1,
  "preferredDate": "2026-12-10",
  "preferredTime": "10:30",
  "notes": "Primera visita"
}
```

Respuesta 201: registra `status='pendiente'`.

### Chat local

```http
POST /api/chat
Content-Type: application/json

{
  "message": "¿Qué servicios ofrecen?",
  "history": [
    {"role":"user","content":"Hola"},
    {"role":"assistant","content":"¡Hola!"}
  ]
}
```

Ollama responde normalmente en JSON `{"ok":true,"reply":"...","model":"gemma3:4b"}`. Si Ollama está cerrado/no hay modelo disponible, HTTP 503.

### Ejemplos PowerShell

```powershell
Invoke-RestMethod http://localhost:4000/health
Invoke-RestMethod http://localhost:4000/api/site
Invoke-RestMethod http://localhost:4000/api/chat/health

$body = @{ message = 'Cual es el horario?'; history = @() } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:4000/api/chat -Method Post -ContentType 'application/json' -Body $body
```
