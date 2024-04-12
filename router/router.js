const express = require("express");
const router = express.Router();
const { Workbook } = require("exceljs");
const axios = require("axios");

// Initialize multer without disk storage (uploading files directly in memory)

router.get("/get-stock", async (req, res) => {
  const { date, name, diff } = req.query; // Assuming parameters are sent via query string
  try {
    const response = await axios.get(
      `https://markethound.in/api/premiums?name=${name}&expiry=${date}`
    );
    const data = response.data;

    let above7Points = [];
    for (let i = 1; i < data.result.length; i++) {
      const currentItem = data.result[i];
      const prevItem = data.result[i - 1];
      const diffs = Math.abs(
        currentItem.straddle_price - prevItem.straddle_price
      );
      if (diffs > +diff) {
        above7Points.push(prevItem);
        above7Points.push(currentItem);
      }
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Stock Data");

    // Add headers
    worksheet.addRow([
      "Straddle Price",
      "Time",
      "Strike",
      "Spot LTP",
      "Fair Price",
    ]);

    // Add data rows
    above7Points.forEach((item) => {
      worksheet.addRow([
        item.straddle_price,
        item.time,
        item.strike,
        item.spot_ltp,
        item.fair_price,
      ]);
    });

    // Set up the response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=stock_data.xlsx"
    );
    // Write the workbook to the response stream
    await workbook.xlsx.write(res);

    // End the response after sending the Excel file
    res.end();
  } catch (error) {
    res.status(500).json({ message: `Error fetching items: ${error.message}` });
  }
});


module.exports = router;
