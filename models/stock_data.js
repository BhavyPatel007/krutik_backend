const mongoose = require('mongoose');

const stockDataSchema = new mongoose.Schema({
    date: Date,
    full: { type: Number, default: 0 }, // Ensure default value is set to 0 for numeric fields
    threeMonth: { type: Number, default: 0 },
    oneMonth: { type: Number, default: 0 },
    results: String,
    price: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    low: { type: Number, default: 0 },
    changes: { type: Number, default: 0 },
    symbol: String,
    sector: String,
    dayDifference: { type: Number, default: 0 },
    nifty50: Boolean,
    dynamicDates: {
        type: Map,
        of: Number // Adjust the type based on your data type
    }
});

// const StockData = mongoose.model('StockData', stockDataSchema);
const StockData = mongoose.model('krutikdata', stockDataSchema);

module.exports = StockData;
