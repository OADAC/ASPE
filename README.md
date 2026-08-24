# R-Mob TraceLoop · VERSION ASPE · EDRO/CUEVA

Repositorio de publicación de la plataforma LIFE R-Mob TraceLoop.

## Estado de esta entrega

- Plataforma web: versión v19-ASPE.
- GIS: 12 actuaciones georreferenciadas y actuación J2 pendiente de ubicación.
- Red municipal: 31 puntos/lectores.
- Paquetes de trabajo: alcance EDRO/Aspe en castellano, con 7 WP y 27 tareas vinculadas al demostrador municipal.
- Filtros WP: eliminados; esta edición tiene un único alcance cerrado EDRO/Aspe.
- Descargas WP: únicamente PDF.
- Entrada pública: `index.html`.

## Estructura

```text
index.html                       plataforma preparada para GitHub Pages
docs/                            PDF EDRO/Aspe descargable desde la plataforma
data/workpackages_current_es.json
                                 fuente estructurada del alcance EDRO/Aspe
assets/                          identidad y renders reutilizables
scripts/                         preparación y control de la entrega
```

## Sustituir los WP EDRO/Aspe

Para actualizar únicamente el documento descargable, sustituir este archivo conservando exactamente su nombre:

```text
docs/Work_Plan_EDRO_ASPE_RMob_TraceLoop_ES.pdf
```

El botón del `index.html` apunta al PDF externo. No es necesario volver a incrustarlo.

Si también cambia el texto de los WP mostrado dentro de la interfaz, hay que sustituir el `index.html` por la nueva compilación. Después se puede ejecutar:

```text
npm run prepare:docs
npm run check
```

El JSON de `data/` conserva las 27 tareas EDRO/Aspe y la relación normalizada con cada socio; la página publicada lleva una copia embebida para funcionar también al abrirse de forma local.

## Publicación con GitHub Pages

1. Crear un repositorio vacío en GitHub.
2. Subir el contenido de esta carpeta a la raíz del repositorio.
3. En `Settings → Pages`, seleccionar `Deploy from a branch`.
4. Elegir la rama principal y la carpeta `/ (root)`.
5. Guardar y esperar a que GitHub publique la URL.

Antes de subir una actualización, ejecutar `npm run check` si se dispone de Node.js.

## Nota de uso

No se incorpora licencia abierta. Los contenidos, documentación técnica, branding y activos permanecen bajo las condiciones que determine EDRO/CUEVA y el consorcio.
