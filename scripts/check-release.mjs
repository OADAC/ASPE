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

const checks = {
  noWordLink: !/href="[^"]+\.docx"/i.test(html),
  externalPdf: html.includes('href="docs/Work_Plan_EDRO_ASPE_RMob_TraceLoop_ES.pdf"'),
  noEmbeddedWord: !html.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64"),
  noEmbeddedPdf: !html.includes("application/pdf;base64"),
  workPackages: (html.match(/"id":"WP[2-8]"/g) ?? []).length,
  tasks: (html.match(/"id":"T[2-8]\.\d+"/g) ?? []).length,
  noWpFilters: !html.includes("data-wp-filter="),
  iPathCatalogue: html.includes("iPath"),
};

if (!checks.noWordLink || !checks.externalPdf || !checks.noEmbeddedWord || !checks.noEmbeddedPdf) {
  failures.push("descarga externa únicamente PDF");
}
if (checks.workPackages !== 7) failures.push(`WP esperados: 7; encontrados: ${checks.workPackages}`);
if (checks.tasks !== 27) failures.push(`tareas esperadas: 27; encontradas: ${checks.tasks}`);
if (!checks.noWpFilters) failures.push("la versión Aspe no debe mostrar filtros WP");
if (!checks.iPathCatalogue) failures.push("enlace o referencia iPath");

const result = {
  ok: failures.length === 0,
  files: required.length,
  htmlBytes: fs.statSync(path.join(root, "index.html")).size,
  checks,
  failures,
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
