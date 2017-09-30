var express = require("express"),
router = express.Router(),
ethSell = require('../models/ethSell'),
middleware = require('../middleware');


router.get("/listings/ethSell", function(req, res){
ethSell.find({}, function(err, allethSells){
    if(err){
        console.log(err);
    } else {
        res.render("listings/ethSell", {ethSells: allethSells, currentUser: req.user, page: 'ethSells'});
    }
});
});

router.get("/listings/ethSell/new", middleware.isLoggedIn, function(req, res){
res.render("listings/ethSellNew");
});

router.post("/listings/ethSell", middleware.isLoggedIn, function(req, res){
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
ethSell.create(newListing, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
        req.flash("success", "Listing posted successfully!");
        res.redirect("/listings/ethSell");
    }
})
});

router.get("/listings/ethSell/:id", function(req, res){
ethSell.findById(req.params.id).exec(function(err, foundethSell){
    if(err){
        console.log(err);
    } else {
        res.render("listings/ethSellShow", { ethSell: foundethSell });
    }
})
});

router.delete("/listings/ethSell/:id", middleware.checkethSellOwnership, function(req, res){
ethSell.findByIdAndRemove(req.params.id, function(err){
    if(err){
        req.flash("error", "You don't have permission to do that");
        res.redirect("back");
    } else {
        req.flash("error", "Listing removed successfully!");
        res.redirect("/listings/ethSell");
    }
});
});

module.exports = router;