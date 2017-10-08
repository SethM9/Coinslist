var express = require("express"),
    router = express.Router(),
    xrpListing = require('../models/xrpListing'),
    middleware = require('../middleware');


//XRP Routes
router.get('/listings/xrp', function(req, res){
xrpListing.find({}, function(err, allxrpListings){
    if(err){
        console.log(err);
    } else {
        res.render('listings/xrp.ejs', {xrpListings: allxrpListings, currentUser: req.user, page: 'xrpListings'})
    }
})
});

router.get('/listings/xrp/new', middleware.isLoggedIn, function(req, res){
res.render("listings/xrpNew");
});

router.post('/listings/xrp', middleware.isLoggedIn, function(req, res){
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
    xrpListing.create(newListing, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Listing posted successfully!");
            res.redirect("/listings/xrp");
        }
    })
});

router.get("/listings/xrp/:id", function (req, res) {
    xrpListing.findById(req.params.id).exec(function (err, foundxrpListing) {
        if (err) {
            console.log(err);
        } else {
            res.render("listings/xrpShow", { xrpListing: foundxrpListing });
        }
    })
});

router.delete("/listings/xrp/:id", middleware.checkxrpListingOwnership, function (req, res) {
    xrpListing.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.flash("error", "You don't have permission to do that");
            res.redirect("/listings/xrp");
        } else {
            req.flash("error", "Listing removed successfully!");
            res.redirect("/listings/xrp");
        }
    });
});


module.exports = router;