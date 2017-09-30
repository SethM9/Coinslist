var express = require("express"),
    router = express.Router(),
    btcSell = require('../models/btcSell'),
    middleware = require('../middleware');


router.get("/listings/btcSell", function(req, res){
    btcSell.find({}, function(err, allbtcSells){
        if(err){
            console.log(err);
        } else {
            res.render("listings/btcSell", {btcSells: allbtcSells, currentUser: req.user, page: 'btcSells'});
        }
    });
});

router.get("/listings/btcSell/new", middleware.isLoggedIn, function(req, res){
    res.render("listings/btcSellNew");
});

router.post("/listings/btcSell", middleware.isLoggedIn, function(req, res){
    //Get data from form and add new listings array
    var title = req.body.title;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newListing = {title: title, price: price, description: desc, author: author};
    //Create and save to DB
    btcSell.create(newListing, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Listing posted successfully!");
            res.redirect("/listings/btcSell");
        }
    })
});

router.get("/listings/btcSell/:id", function(req, res){
    btcSell.findById(req.params.id).exec(function(err, foundbtcSell){
        if(err){
            console.log(err);
        } else {
            res.render("listings/btcSellShow", { btcSell: foundbtcSell });
        }
    })
});

router.delete("/listings/btcSell/:id", middleware.checkbtcSellOwnership, function(req, res){
    btcSell.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "You don't have permission to do that");
            res.redirect("back");
        } else {
            req.flash("error", "Listing removed successfully!");
            res.redirect("/listings/btcSell");
        }
    });
});

module.exports = router;