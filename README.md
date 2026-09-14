# R-Mob TraceLoop · VERSION ASPE v21 · MUNICIPAL OS · EDRO/CUEVA

Repositorio de publicación de la plataforma LIFE R-Mob TraceLoop.

## Estado de esta entrega

- Plataforma web: versión v21-ASPE-MUNICIPAL.
- GIS: 13 actuaciones georreferenciadas; las aceras J2 quedan confirmadas en C. Monóvar (38.349105, -0.772852).
- Aceras J2: dos tramos de 75 m por 1,5 m, 225 m² totales, iluminación integrada programable y sensores.
- Entorno Pumptrack: hasta 500 m² de plataforma perimetral multifuncional; la pista existente no se transforma.
- Red municipal: 31 puntos/lectores de referencia. La cantidad adicional de luminarias, detectores y antenas queda pendiente de ingeniería.
- Superficie total cuantificada: 1.079 m².
- Paquetes de trabajo: alcance EDRO/Aspe en castellano, con 7 WP y 27 tareas vinculadas al demostrador municipal.
- Filtros WP: eliminados; esta edición tiene un único alcance cerrado EDRO/Aspe.
- Descargas WP: únicamente PDF.
- Entrada pública: `index.html`.

## Evolución Municipal OS v21

- Centro de mando integral con cuatro demostrativos municipales enlazados.
- Módulos específicos para accesos, prioridad peatonal, aceras J2, entorno Pumptrack y servicios de limpieza/mantenimiento.
- Simulador de órdenes de trabajo conectado conceptualmente con activo, DPP, POI, stock e indicador LIFE.
- Selector de modos del entorno Pumptrack y de tramos de aceras.
- Expediente JSON exportable desde la interfaz.
- Diferenciación visible entre diseño confirmado, simulación UI, medición futura y dispositivos pendientes de ingeniería.
- Interfaz municipal clara con navegación operativa y adaptación responsive.

## Estructura

```text
index.html                       plataforma preparada para GitHub Pages
docs/                            PDF EDRO/Aspe descargable desde la plataforma
data/workpackages_current_es.json
                                 fuente estructurada del alcance EDRO/Aspe
assets/                          identidad y renders reutilizables
scripts/                         preparación y control de la entrega
docs/ACTUALIZACION_DEMOSTRADORES_ASPE_2026-09-03.md
                                 hipótesis, fuentes y magnitudes actualizadas
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
