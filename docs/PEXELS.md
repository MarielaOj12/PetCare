# Multimedia, derechos y sustitución del video

## Material entregado

- `frontend/src/assets/animales.mp4` es una versión optimizada del `VIDEO.mp4` que adjuntó el usuario. Se mantiene en la carpeta del frontend para que la portada se reproduzca sin depender de un servidor externo. **No se afirma que el video proporcionado provenga de Pexels**, pues no hay información que permita verificarlo.
- `frontend/src/assets/poster-animales.jpg` es una captura del mismo video para la carga de portada.
- Las fotos de demostración son imágenes públicas de Pexels obtenidas por URL desde registros MySQL, no fotografías reales de la veterinaria.

## Video Pexels integrado y opción de reemplazo local

Fuente: **Alex Kad, “Dog Running in the Grass Field”**, video Pexels #4166347, licencia gratuita publicada por Pexels:
https://www.pexels.com/video/dog-running-in-the-grass-field-4166347/

El botón **«▶ Video Pexels»** de la portada utiliza la URL directa del video verificado. Si falla la conexión, vuelve al video local. Para disponer del video Pexels sin conexión, sigue estos pasos:

1. Abre el enlace y pulsa **Free download / Descargar gratis**.
2. Elige una resolución moderada (preferentemente HD 1280×720 o 1920×1080 si aparece).
3. Renombra el archivo descargado a `animales.mp4` y reemplaza `frontend/src/assets/animales.mp4`.
4. Mantén el nombre exacto y vuelve a ejecutar Angular. No necesitas cambiar las consultas.
5. Si usas otro nombre, actualiza MySQL: `UPDATE clinic_settings SET hero_video='/assets/mi-video.mp4' WHERE id=1;`.

También puede usarse un video alternativo de Pexels: https://www.pexels.com/video/dog-running-on-the-grass-14091385/

**Revisión de derechos:** Antes de publicar, verifica la licencia de cada recurso; no atribuyas fotos ilustrativas a una clínica real. La licencia de Pexels está en https://www.pexels.com/license/.

## Fotos de ejemplo y fuentes

- https://www.pexels.com/photo/a-dog-at-the-clinic-6235650/
- https://www.pexels.com/photo/cat-at-the-veterinarian-6816859/
- https://www.pexels.com/photo/a-dog-having-a-medical-check-up-6816858/
- https://www.pexels.com/photo/volunteers-checking-on-a-dog-7469212/
- https://www.pexels.com/photo/a-veterinarian-sitting-beside-a-black-dog-lying-on-the-table-6234618/
- https://www.pexels.com/photo/doctor-checking-on-a-dog-7469233/
- https://www.pexels.com/photo/a-dog-having-a-checkup-on-a-veterinary-7470752/
