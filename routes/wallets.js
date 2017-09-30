var express = require("express"),
    router = express.Router(),
    User = require('../models/user'),
    Wallet = require('../models/wallet'),
    middleware = require('../middleware');

router.get("/users/:id/wallets", middleware.isLoggedIn, function(req, res){
    if(req.user.id != req.params.id){
        req.flash("error", "You don't have permission to do that");
        res.redirect("back");
    } else {
    res.render("wallets");
    } 
});


module.exports = router;