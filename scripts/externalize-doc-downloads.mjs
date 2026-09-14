import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const pdfData = /href="data:application\/pdf;base64,[^"]+"/g;

const pdfMatches = html.match(pdfData) ?? [];

if (pdfMatches.length === 0) {
  console.log("La descarga PDF ya utiliza un archivo externo.");
  process.exit(0);
}

if (pdfMatches.length !== 1) {
  throw new Error("No se localizó exactamente el PDF embebido esperado.");
}

html = html
  .replace(pdfData, 'href="docs/Work_Plan_EDRO_ASPE_RMob_TraceLoop_ES.pdf"')
  .replaceAll(
    'download="EDRO_LIFE_RMob_WorkPackages_Definitivos_ES_v18.pdf"',
    'download="Work_Plan_EDRO_ASPE_RMob_TraceLoop_ES.pdf"',
  );

fs.writeFileSync(indexPath, html, "utf8");
console.log(`index.html preparado para GitHub: ${fs.statSync(indexPath).size} bytes`);
