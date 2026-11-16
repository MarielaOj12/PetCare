# PRACTICA_VET — PetCare

**Proyecto web multimedia entregado en ZIP**, con frontend Angular 20, backend Node.js + Express 5, MySQL 8 y chatbot local Ollama + Gemma 3. Cuenta con un video en bucle en la portada, un diseño responsive y formularios funcionales conectados a MySQL.

> **Importante:** PetCare es una veterinaria ficticia para una práctica universitaria. Dirección, teléfono, precios, horarios, identidad comercial e historia son datos de demostración; modifica los registros antes de presentar la web como una clínica real.

## 1. Programas necesarios para Windows 11

1. **Node.js 22 LTS** (incluye npm): https://nodejs.org/en/download
2. **MySQL 8.0+** (MySQL Community Server y, opcional, Workbench): https://dev.mysql.com/downloads/mysql/  y  https://dev.mysql.com/downloads/workbench/
   - Alternativa: XAMPP con MySQL/MariaDB compatible, comprobando el puerto y ajustando `backend/.env`.
   - Alternativa si tienes Docker Desktop: https://www.docker.com/products/docker-desktop/
3. **Ollama para Windows:** https://ollama.com/download/windows
4. **Editor recomendado:** VS Code https://code.visualstudio.com/download
5. **Git** para publicar en GitHub: https://git-scm.com/downloads/win

**Necesitas internet inicialmente** para instalar Node/Angular, descargar Gemma 3 y ver las imágenes remotas de Pexels. El video local funciona sin internet. El modelo se ejecuta en tu equipo y no precisa clave API de pago.

## 2. Extraer el ZIP

Descomprime `PRACTICA_VET.zip` en una ruta, por ejemplo:

```text
C:\Users\TU_USUARIO\Downloads\PRACTICA_VET\
  backend\
  frontend\
  docs\
  docker-compose.yml
  INICIAR_BASE_DE_DATOS.bat
  INICIAR_BACKEND.bat
  INICIAR_FRONTEND.bat
```

## 3. Instalar MySQL y preparar la conexión

Abre MySQL Workbench, verifica que el servidor esté iniciado y recuerda el usuario, contraseña y puerto. Abre `backend/.env` y ajusta estos campos (el archivo existe en el ZIP):

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CLAVE_MYSQL
DB_NAME=practica_vet
```

Si tu root no tiene contraseña de desarrollo, deja `DB_PASSWORD=` vacío. **No compartas un archivo `.env` con contraseñas reales**. Si tu MySQL de XAMPP usa otro puerto, cámbialo.

**Alternativa con Docker:** desde la carpeta raíz ejecuta `docker compose up -d` (solo desarrollo). Este contenedor MySQL usa root sin contraseña y se expone únicamente en localhost:3306. Si el puerto está ocupado, usa tu MySQL existente en lugar del contenedor.

## 4. Instalar y crear tablas con datos de ejemplo

Abre **PowerShell** dentro de `PRACTICA_VET`:

```powershell
cd .\backend
npm.cmd install
npm.cmd run db:init
```

`db:init` crea automáticamente `practica_vet`, las tablas y los datos iniciales (se puede ejecutar más de una vez). No necesitas crear tablas manualmente en Workbench. Requiere que el usuario de MySQL tenga permiso para crear bases de datos.

Para revisar las tablas abre MySQL Workbench y ejecuta:

```sql
USE practica_vet;
SHOW TABLES;
SELECT * FROM services;
SELECT * FROM appointment_requests;
SELECT * FROM contact_messages;
```

También incluimos `docs/MYSQL_CONSULTAS.sql`.

## 5. Instalar Ollama y Gemma 3

Instala Ollama desde el sitio oficial. Abre PowerShell y ejecuta:

```powershell
ollama --version
ollama pull gemma3:4b
ollama list
```

Si Ollama no está iniciado, abre la aplicación de Ollama en Windows o ejecuta `ollama serve` en otra terminal (no inicies dos instancias simultáneamente). Para probar el modelo:

```powershell
ollama run gemma3:4b
```

Escribe un mensaje y sal con `/bye`. Por defecto Ollama expone `http://127.0.0.1:11434`. Backend ya contiene:

```dotenv
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=gemma3:4b
```

Puedes cambiar a `gemma3:1b` si tu PC necesita consumir menos memoria: primero ejecuta `ollama pull gemma3:1b` y cambia `OLLAMA_MODEL` en `.env`.

## 6. Ejecutar el backend (terminal 1)

```powershell
cd .\backend
npm.cmd run dev
```

Debe anunciar `http://localhost:4000`. Abre:

- http://localhost:4000/health
- http://localhost:4000/api/site
- http://localhost:4000/api/chat/health

Si `health` no responde con `ok:true`, revisa MySQL, `.env` y `npm.cmd run db:init`.

## 7. Ejecutar Angular (terminal 2)

**Sin cerrar la terminal anterior**, abre otra terminal en la carpeta `PRACTICA_VET`:

```powershell
cd .\frontend
npm.cmd install
npm.cmd start
```

Entra desde tu navegador a **http://localhost:4200/**.

La API se comunica mediante el proxy de `frontend/proxy.conf.json`: Angular usa rutas `/api`, y Node.js atiende por el puerto 4000. El proyecto no requiere cambiar URLs con una IP fija para usarlo en la misma computadora.

**Atajos para otra ocasión:** primero inicia MySQL y Ollama; luego doble clic en `INICIAR_BACKEND.bat` y `INICIAR_FRONTEND.bat` (uno para cada terminal). La primera instalación siempre es recomendable hacerla manualmente para revisar errores.

## 8. Pruebas de funcionamiento

- **Inicio:** el video se reproduce automáticamente en silencio y en bucle.
- **Servicios, especialidades, nosotros, precios, ubicación:** se cargan desde `GET /api/site` a partir de MySQL.
- **Contacto:** escribe un mensaje, envía y verifica en MySQL con `SELECT * FROM contact_messages;`.
- **Agendar cita:** abre el formulario, envía y consulta `SELECT * FROM appointment_requests;`: la fila se guarda con estado `pendiente`.
- **Chat Nala:** pregunta «¿Qué vacunas ofrecen?» y revisa la respuesta de Gemma 3; usa `/api/chat/health` si aparece desconectado.
- **API:** con el backend iniciado ejecuta `npm.cmd run smoke` en `backend`.

## 9. Pexels y archivo de video

La portada incluye el video enviado por el usuario, comprimido de 114 MB a aproximadamente 3 MB. Adicionalmente, el botón «Video Pexels» reproduce un clip de Pexels verificado mediante URL guardada en MySQL; «Video original» vuelve al material adjunto. Como no sabemos su autor original, **no se le atribuye procedencia Pexels**. Para usar el clip de Pexels de manera local (sin depender de conexión externa), sigue `docs/PEXELS.md` y reemplaza el video con el clip documentado allí. Se conserva el mismo nombre `animales.mp4`, por lo que no cambia el código. Las fotografías ilustrativas usan URL de Pexels guardadas en MySQL.

## 10. Modificar contenidos sin tocar Angular

En Workbench:

```sql
USE practica_vet;
UPDATE clinic_settings SET phone='+591 NUMERO REAL' WHERE id=1;
UPDATE clinic_settings SET address='DIRECCION VERIFICADA' WHERE id=1;
UPDATE prices SET amount=90.00 WHERE id=1;
```

Al recargar Angular verás los nuevos valores. Cambia también las secciones de historia, misión, horarios y otros datos en MySQL. **No publiques el teléfono demostrativo como número real.**

## 11. Subir frontend + backend a GitHub

No es posible publicar en **tu** cuenta sin que se autorice la conexión a GitHub. El ZIP ya incluye los dos proyectos; desde la carpeta raíz, después de crear en GitHub un repositorio vacío llamado `PRACTICA_VET`:

```powershell
git init
git add .
git commit -m "Proyecto PetCare Angular Node MySQL Ollama"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/PRACTICA_VET.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu nombre de usuario real. GitHub pedirá autenticación con su método vigente. **No se incluyen `node_modules`, datos de MySQL ni credenciales privadas**. Si no quieres publicar el video original por derechos de autor, añade `frontend/src/assets/animales.mp4` a `.gitignore` y explica en el repositorio cómo colocar el clip autorizado de Pexels.

## 12. Solución de problemas frecuentes

| Problema | Diagnóstico y solución |
|---|---|
| `npm` o `node` no reconocido | Instala Node.js y vuelve a abrir PowerShell. Usa `npm.cmd` para evitar restricciones de scripts en Windows. |
| `ECONNREFUSED 3306` | Inicia MySQL y confirma el puerto en `.env`. |
| `Access denied for user root` | Corrige usuario y contraseña de MySQL en `.env`. |
| `Unknown database` / `Table doesn't exist` | Ejecuta `npm.cmd run db:init` desde `backend`. |
| Angular muestra «No pudimos abrir PetCare» | Revisa primero `http://localhost:4000/health`, luego el proxy y que la terminal backend siga abierta. |
| `Ollama no disponible` / HTTP 503 | Ejecuta `ollama list`, instala `gemma3:4b` y deja Ollama abierto. |
| Gemma 3 tarda en contestar | La primera petición necesita cargar el modelo en memoria; evita ejecutar modelos enormes. |
| Imágenes no cargan | Las fotografías son remotas de Pexels; requieren internet. El video sí está local. |
| Puerto 4200 o 4000 ocupado | Cierra el proceso anterior o cambia los puertos y ajusta `proxy.conf.json` / `.env`. |
| `npm install` no completa | Comprueba acceso a registry.npmjs.org, red, proxy y reinicia la instalación. |

## Estructura resumida

```text
PRACTICA_VET/
├── README.md
├── backend/
│   ├── .env                  (plantilla de desarrollo; ignorada por Git)
│   ├── .env.example
│   ├── package.json
│   ├── database/{schema.sql,init.js,seed.js}
│   └── src/
│       ├── App.js,server.js
│       ├── config/db.js
│       ├── routes/index.js
│       ├── controllers/
│       ├── models/
│       ├── middleware/
│       └── services/ollamaService.js
├── frontend/
│   ├── angular.json,package.json,proxy.conf.json
│   └── src/{index.html,main.ts,styles.css,app/,assets/}
├── docs/{API.md,ARQUITECTURA.md,MYSQL_CONSULTAS.sql,PEXELS.md}
└── INICIAR_*.bat
```

**Nota de alcance:** no se adjuntan `node_modules` porque se descargan automáticamente con `npm install`. Tampoco se incluye un modelo de IA de varios GB ni un servidor MySQL dentro del ZIP: ambos se instalan por separado con los pasos anteriores.
