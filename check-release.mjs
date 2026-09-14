import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "docs/Work_Plan_EDRO_ASPE_RMob_TraceLoop_ES.pdf",
  "data/workpackages_current_es.json",
  "assets/cueva_logo.png",
];

const failures = required.filter((relative) => !fs.existsSync(path.join(root, relative)));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/workpackages_current_es.json"), "utf8"));

const checks = {
  noWordLink: !/href="[^"]+\.docx"/i.test(html),
  externalPdf: html.includes('href="docs/Work_Plan_EDRO_ASPE_RMob_TraceLoop_ES.pdf"'),
  noEmbeddedWord: !html.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64"),
  noEmbeddedPdf: !html.includes("application/pdf;base64"),
  workPackages: (html.match(/"id":"WP[2-8]"/g) ?? []).length,
  tasks: (html.match(/"id":"T[2-8]\.\d+"/g) ?? []).length,
  noWpFilters: !html.includes("data-wp-filter="),
  iPathCatalogue: html.includes("iPath"),
  v20Scope: html.includes("1.079 m²") && html.includes("38.349105") && html.includes("225 m²"),
  noLegacySidewalk: !html.includes("150 m²") && !html.includes("ubicación pendiente"),
  dataTotals: data?.demonstrator_v20?.totals?.area_m2 === 1079 && data?.demonstrator_v20?.reference_readers === 31,
  municipalV21: html.includes("Municipal OS v21") && html.includes("Centro de mando integral"),
  municipalModules: [
    "Mando integral", "Accesos", "Pasos", "Aceras J2", "Pumptrack", "Servicios",
    "Incidencias", "Activos", "Stock", "DPP / POI", "Red / IoT", "Impacto LIFE", "Formación",
  ].every((label) => html.includes(label)),
  evidenceExport: html.includes("Exportar expediente JSON") && html.includes("application/json"),
  provenanceLabels: html.includes("Diseño confirmado") && html.includes("Simulación UI") && html.includes("Pendiente ingeniería"),
};

if (!checks.noWordLink || !checks.externalPdf || !checks.noEmbeddedWord || !checks.noEmbeddedPdf) {
  failures.push("descarga externa únicamente PDF");
}
if (checks.workPackages !== 7) failures.push(`WP esperados: 7; encontrados: ${checks.workPackages}`);
if (checks.tasks !== 27) failures.push(`tareas esperadas: 27; encontradas: ${checks.tasks}`);
if (!checks.noWpFilters) failures.push("la versión Aspe no debe mostrar filtros WP");
if (!checks.iPathCatalogue) failures.push("enlace o referencia iPath");
if (!checks.v20Scope) failures.push("alcance v20 de aceras/ubicación/superficie");
if (!checks.noLegacySidewalk) failures.push("persisten datos J2 heredados de 150 m² o ubicación pendiente");
if (!checks.dataTotals) failures.push("totales estructurados v20 o red de referencia incorrectos");
if (!checks.municipalV21) failures.push("cabecera Municipal OS v21");
if (!checks.municipalModules) failures.push("faltan módulos de la consola municipal");
if (!checks.evidenceExport) failures.push("exportación de evidencia JSON");
if (!checks.provenanceLabels) failures.push("etiquetas de procedencia/estado del dato");

const result = {
  ok: failures.length === 0,
  files: required.length,
  htmlBytes: fs.statSync(path.join(root, "index.html")).size,
  checks,
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
