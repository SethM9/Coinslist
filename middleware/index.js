var middlewareObj = {},
    User = require("../models/user"),
    btcListing = require("../models/btcListing"),
    ethListing = require("../models/ethListing"),
    ltcListing = require("../models/ltcListing"),
    xrpListing = require("../models/xrpListing");

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that."); 
    res.redirect("/login");
};

module.exports = middlewareObj;