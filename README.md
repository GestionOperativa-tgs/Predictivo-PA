# Predictivo de Protección Anticorrosiva · GPM

Tablero web (GitHub Pages) del seguimiento predictivo de la protección catódica del Gasoducto Perito Moreno. Reúne:

- **Relevamiento mensual de rectificadores** (GPM-001 a GPM-005), desde enero 2025. Se carga en Google Sheets.
- **Relevamiento anual de potenciales** (Test Point Inspection), 2025 y 2026. Se guarda en el repositorio.

Criterios: **criterio TGS** OFF ≤ −1,20 V (línea llena) y **mínimo de protección** OFF ≤ −0,85 V (línea punteada, NACE/AMPP SP0169).

## Archivos
- `index.html`: el tablero, en un solo archivo. Trae una copia embebida de los datos mensuales como respaldo.
- `potenciales.js`: relevamientos anuales de potenciales (uno por año).
- `Code.gs`: Apps Script que expone el Google Sheets como JSON.
- `BASE_PREDICTIVO_PA.xlsx`: base para crear el Google Sheets.
  - **RECTIFICADORES**: una fila por rectificador y por mes. Es la pestaña de carga mensual.
  - **HALLAZGOS**: acciones de seguimiento (estado Pendiente / En curso / Cerrado / A definir).
  - **EQUIPOS**: catálogo de rectificadores, ubicación y PK.
  - **AYUDA**: instrucciones de carga.

## Puesta en marcha
1. Subir `BASE_PREDICTIVO_PA.xlsx` a Drive y abrirlo como Google Sheets (Archivo > Guardar como Hojas de cálculo de Google).
2. En ese Sheets: Extensiones > Apps Script. Pegar `Code.gs` e implementarlo como aplicación web (Ejecutar como: Yo · Acceso: Cualquier usuario). Copiar la URL `/exec`.
3. En `index.html`, completar `const FUENTE = { appsScriptUrl: "https://script.google.com/macros/s/.../exec", sheetId: "" };`.
4. En GitHub: Settings > Pages > Deploy from branch `main` / root.

## Carga mensual
Agregar 5 filas por mes en **RECTIFICADORES** (una por equipo):
- **Año / Mes** son los del relevamiento ("Periodic Survey"), no los de la fecha de inspección.
- **Estado** es obligatorio: `E/S`, `F/S` o `Sin acceso`.
- **Horómetro**: solo números. Vacío si no hay horómetro o está quemado (no escribir X).
- Sin lectura (sin acceso): dejar vacíos V, A y Horómetro.

El tablero toma como corte el último mes cargado. Si la URL de datos falla, usa la copia embebida y lo indica en el pie.

## Relevamiento anual
Cuando se cierra el relevamiento, exportar el **Test Point Inspection Grid** (Excel) y regenerar `potenciales.js` agregando el año nuevo. El tablero detecta solo los años disponibles y compara los dos últimos.

## Indicadores
- **Disponibilidad PC**: meses-equipo en servicio / meses-equipo relevados (los meses sin acceso no cuentan).
- **Funcionamiento (%)**: horas de horómetro entre dos lecturas / horas calendario entre esas fechas.
- **Criticidad del rectificador**: Alta si está F/S o sin acceso en la última lectura; Media si tuvo ajuste en los últimos 6 meses o no tiene horómetro; Baja en el resto.
