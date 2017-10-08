var express = require("express"),
    router = express.Router(),
    btcListing = require('../models/btcListing'),
    middleware = require('../middleware');
    
//BTC Routes
router.get("/listings/btc", function(req, res){
    btcListing.find({}, function(err, allbtcListings){
        if(err){
            console.log(err);
        } else {
            res.render("listings/btc", {btcListings: allbtcListings, currentUser: req.user, page: 'btcListings'});
        }
    });
});


router.get("/listings/btc/new", middleware.isLoggedIn, function(req, res){
    res.render("listings/btcNew.ejs");
});

router.post("/listings/btc", middleware.isLoggedIn, function(req, res){
    //Get data from form and add new listings array
    var title = req.body.title;
    var price = req.body.price;
    var amount = req.body.amount;
    var desc = req.body.description;
    var payment = req.body.payment;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newListing = {title: title, price: price, amount: amount, description: desc, payment: payment, author: author};
    //Create and save to DB
    btcListing.create(newListing, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Listing posted successfully!");
            res.redirect("/listings/btc");
        }
    })
});

router.get("/listings/btc/:id", function(req, res){
    btcListing.findById(req.params.id).exec(function(err, foundbtcListing){
        if(err){
            console.log(err);
        } else {
            res.render("listings/btcShow", {btcListing: foundbtcListing});
        }
    })
});

router.get("/listings/btc/:id/trade", middleware.isLoggedIn, function(req, res){
    btcListing.findById(req.params.id).exec(function(err, foundbtcListing){
        if(err){
            console.log(err);
        } else {
            res.render("listings/btcTrade", {btcListing: foundbtcListing});
        }
    });
});

router.delete("/listings/btc/:id", middleware.checkbtcListingOwnership, function(req, res){
    btcListing.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "You don't have permission to do that");
            res.redirect("/listings/btc");
        } else {
            req.flash("error", "Listing removed successfully!");
            res.redirect("/listings/btc");
        }
    });
});

module.exports = router;