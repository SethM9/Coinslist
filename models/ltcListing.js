var mongoose = require('mongoose');

var ltcListingSchema = new mongoose.Schema({
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

module.exports = mongoose.model("ltcListing", ltcListingSchema);