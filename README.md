# PetCare

### Plataforma web para atención y servicios veterinarios

PetCare es una aplicación web que reúne información de una clínica veterinaria y facilita la comunicación con sus clientes. Permite explorar servicios, especialidades y tarifas, solicitar citas, enviar consultas y conversar con **Nala**, un asistente virtual que utiliza **Gemma 3** mediante **Ollama**.

La interfaz está desarrollada en Angular y se comunica con una API REST construida con Node.js y Express. Los contenidos y registros de los formularios se gestionan en MySQL o MariaDB.

## Funcionalidades

- **Inicio multimedia:** video de animales reproducido automáticamente, en silencio y en bucle.
- **Servicios y especialidades:** catálogo administrado desde la base de datos.
- **Información de la clínica:** presentación institucional, horarios, medios de contacto, ubicación y galería.
- **Precios:** tarifas informativas consultadas mediante la API.
- **Contacto:** formulario que registra los mensajes recibidos.
- **Solicitudes de cita:** recepción de solicitudes con estado inicial **pendiente**; el envío no confirma una reserva.
- **Nala, asistente virtual:** respuestas sobre la información disponible de PetCare mediante Ollama y Gemma 3.
- **Diseño adaptable:** navegación para computadoras y dispositivos móviles.

## Tecnologías

| Componente | Tecnología |
|---|---|
| Interfaz | Angular 20, TypeScript, HTML y CSS |
| API | Node.js y Express 5 |
| Persistencia | MySQL / MariaDB, mediante `mysql2` |
| Inteligencia artificial | Ollama con `gemma3:4b` |
| Multimedia | Video local y recursos visuales de Pexels |

## Organización del código

```text
backend/
  database/       Definición de tablas y carga inicial
  src/
    config/       Conexión a la base de datos
    controllers/  Controladores HTTP
    middleware/   Validación y manejo de errores
    models/       Consultas a la base de datos
    routes/       Rutas de la API
    services/     Integración con Ollama
  tests/          Comprobaciones de la API
frontend/
  src/
    app/          Componentes, modelos y servicio HTTP
    assets/       Video y recursos visuales
docs/             API, arquitectura y multimedia
```

## Requisitos de ejecución

- Node.js 20.19 o superior, con npm.
- MySQL o MariaDB en funcionamiento.
- Ollama y el modelo `gemma3:4b` instalados para habilitar Nala.

## Configuración local

1. Dentro de `backend`, crea o ajusta el archivo `.env` tomando como referencia `.env.example`.
2. Configura el host, puerto, usuario, contraseña y nombre de la base de datos según tu servidor.
3. Con MySQL o MariaDB encendido, instala las dependencias e inicializa los datos:

```powershell
cd backend
npm.cmd install
npm.cmd run db:init
```

4. Inicia el servidor:

```powershell
npm.cmd run dev
```

La API estará disponible en `http://localhost:4000`.

5. En otra terminal, inicia la aplicación web:

```powershell
cd frontend
npm.cmd install
npm.cmd start
```

Abre `http://localhost:4200` en el navegador. Angular utiliza `frontend/proxy.conf.json` para comunicar las peticiones `/api` con Node.js.

6. Para activar el asistente virtual, mantén Ollama disponible y comprueba que el modelo está instalado:

```powershell
ollama pull gemma3:4b
ollama list
```

## API REST

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Estado del servidor y conexión a la base de datos |
| `GET` | `/api/site` | Información general para la interfaz |
| `GET` | `/api/services` | Servicios veterinarios |
| `GET` | `/api/specialties` | Especialidades |
| `GET` | `/api/prices` | Tarifas |
| `GET` | `/api/about` | Información institucional |
| `GET` | `/api/gallery` | Galería |
| `GET` | `/api/faqs` | Preguntas frecuentes |
| `POST` | `/api/contact` | Registro de mensajes |
| `POST` | `/api/appointments` | Registro de solicitudes de cita |
| `GET` | `/api/chat/health` | Disponibilidad de Ollama y del modelo |
| `POST` | `/api/chat` | Consultas al asistente Nala |

Los formatos de solicitud y respuesta están documentados en [`docs/API.md`](docs/API.md).

## Verificación

Con el backend encendido:

```powershell
cd backend
npm.cmd run smoke
```

Para generar la aplicación Angular:

```powershell
cd frontend
npm.cmd run build
```

## Información y contenido multimedia

La base de datos se inicializa con **información de ejemplo** para mostrar las funcionalidades del sistema. Los datos de contacto, la ubicación, los horarios y los precios deben revisarse y reemplazarse por información verificada antes de ofrecer el sitio a clientes reales.

La galería incluye imágenes ilustrativas de Pexels. El proyecto contiene un video local de animales y una alternativa multimedia documentada en [`docs/PEXELS.md`](docs/PEXELS.md). Antes de publicar cualquier contenido audiovisual debe verificarse que se dispone de los derechos de uso correspondientes.

## Seguridad y alcance

Las credenciales y la configuración local se mantienen en `backend/.env`, archivo que **no debe incorporarse al repositorio**. El asistente virtual proporciona información general y no sustituye una valoración veterinaria profesional. La aplicación recibe solicitudes de cita, pero no dispone de confirmación automática ni de un panel público de administración.

---

**PetCare** · Tecnología para una atención más cercana a las mascotas y sus familias.