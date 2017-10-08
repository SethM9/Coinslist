var mongoose = require('mongoose');

var btcListingSchema = new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    payment: String,
    amount: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("btcListing", btcListingSchema);