var mongoose = require('mongoose');

var btcSellSchema = new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("btcSell", btcSellSchema);