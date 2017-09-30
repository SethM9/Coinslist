var middlewareObj = {},
    User = require("../models/user"),
    Wallet = require("../models/wallet"),
    btcListing = require("../models/btcListing"),
    btcSell = require("../models/btcSell"),
    ethListing = require("../models/ethListing"),
    ltcListing = require("../models/ltcListing"),
    xrpListing = require("../models/xrpListing");

middlewareObj.checkbtcListingOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    btcListing.findById(req.params.id, function(err, foundbtcListing){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundbtcListing.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkethListingOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    ethListing.findById(req.params.id, function(err, foundethListing){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundethListing.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkltcListingOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    ltcListing.findById(req.params.id, function(err, foundltcListing){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundltcListing.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkxrpListingOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    xrpListing.findById(req.params.id, function(err, foundxrpListing){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundxrpListing.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkbtcSellOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    btcSell.findById(req.params.id, function(err, foundbtcSell){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundbtcSell.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkethSellOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    ethSell.findById(req.params.id, function(err, foundethSell){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundethSell.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkltcSellOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    ltcSell.findById(req.params.id, function(err, foundltcSell){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundltcSell.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}

middlewareObj.checkxrpSellOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    xrpSell.findById(req.params.id, function(err, foundxrpSell){
        if(err){
            req.flash("error", "Listing not found");
            res.redirect("back");
        } else {
            if(foundxrpSell.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
            }
        }
    })
} else {
    req.flash("error", "You need to log in to do that");
    res.redirect("back");
}
}


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that."); 
    res.redirect("/login");
};

module.exports = middlewareObj;