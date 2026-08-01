import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.2/package/xlsx.mjs";

export function exportTable() {

    const table = document.getElementById("recordsTable");

    const workbook = XLSX.utils.table_to_book(table, {
        sheet: "Counts"
    });

    XLSX.writeFile(workbook, "Count_Report.xlsx");

}
