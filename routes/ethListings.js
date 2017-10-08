var express = require("express"),
    router = express.Router(),
    ethListing = require('../models/ethListing'),
    middleware = require('../middleware');


//ETH Routes
router.get('/listings/eth', function(req, res){
    ethListing.find({}, function(err, allethListings){
        if(err){
            console.log(err);
        } else {
            res.render('listings/eth.ejs', {ethListings: allethListings, currentUser: req.user, page: 'ethListings'})
        }
    })
});

router.get('/listings/eth/new', middleware.isLoggedIn, function(req, res){
    res.render("listings/ethNew");
});

router.post('/listings/eth', middleware.isLoggedIn, function(req, res){
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
        ethListing.create(newListing, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                req.flash("success", "Listing posted successfully!");
                res.redirect("/listings/eth");
            }
        })
    });

router.get("/listings/eth/:id", function (req, res) {
    ethListing.findById(req.params.id).exec(function (err, foundethListing) {
        if (err) {
            console.log(err);
        } else {
            res.render("listings/ethShow", { ethListing: foundethListing });
        }
    })
});

router.delete("/listings/eth/:id", middleware.checkethListingOwnership, function (req, res) {
    ethListing.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.flash("error", "You don't have permission to do that");
            res.redirect("/listings/eth");
        } else {
            req.flash("error", "Listing removed successfully!");
            res.redirect("/listings/eth");
        }
    });
});

    

module.exports = router;