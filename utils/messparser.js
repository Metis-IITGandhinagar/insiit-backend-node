const ExcelJS = require("exceljs");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Download Excel to temp folder
async function downloadExcel(fileUrl) {
  const dest = path.join(os.tmpdir(), `mess_${Date.now()}.xlsx`);

  if (fileUrl.startsWith("http")) {
    const writer = fs.createWriteStream(dest);
    const response = await axios({ url: fileUrl, method: "GET", responseType: "stream" });

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    return dest;
  }

  await fs.promises.copyFile(fileUrl, dest);
  return dest;
}

// Clean blank → "–"
function cleanCell(cell) {
  if (!cell) return "–";
  let text = typeof cell === "object" && cell.text ? cell.text : String(cell);
  return text.trim() === "" ? "–" : text.trim();
}

// Convert vertical rows to newline string
function readMeal(ws, col, start, end) {
  const items = [];
  for (let r = start; r <= end; r++) {
    items.push(cleanCell(ws.getRow(r).getCell(col).value));
  }
  return items.join("\n");
}

async function parseMessExcel(fileUrl) {
  const filePath = await downloadExcel(fileUrl);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const ws = workbook.worksheets[0];

  const days = [2, 3, 4, 5, 6, 7, 8];

  const BREAKFAST = { start: 3, end: 12 };
  const LUNCH = { start: 15, end: 24 };
  const SNACKS = { start: 27, end: 30 };
  const DINNER = { start: 33, end: 40 };

  const mess = [];

  days.forEach((col, index) => {
    mess.push({
      day: index + 1,
      breakfast: readMeal(ws, col, BREAKFAST.start, BREAKFAST.end),
      lunch: readMeal(ws, col, LUNCH.start, LUNCH.end),
      snacks: readMeal(ws, col, SNACKS.start, SNACKS.end),
      dinner: readMeal(ws, col, DINNER.start, DINNER.end),
    });
  });

  return {
    id: Date.now().toString(),
    mess_name: "Hostel Mess",
    mess
  };
}

module.exports = { parseMessExcel };
