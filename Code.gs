/**
 * Apps Script – Predictivo de Protección Anticorrosiva GPM
 * Pegar en Extensiones > Apps Script del Google Sheets que contiene RECTIFICADORES, HALLAZGOS y EQUIPOS.
 * Implementar > Nueva implementación > Aplicación web
 *   Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario (o el dominio de la empresa)
 * Copiar la URL /exec en FUENTE.appsScriptUrl dentro de index.html.
 */
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const leer = n => { const sh = ss.getSheetByName(n); return sh ? sh.getDataRange().getValues() : []; };
  const out = { RECTIFICADORES: leer('RECTIFICADORES'), HALLAZGOS: leer('HALLAZGOS'), EQUIPOS: leer('EQUIPOS'), generado: new Date().toISOString() };
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
