var mongoose = require('mongoose');

var walletSchema = new mongoose.Schema({
    title: String,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Wallet", walletSchema);