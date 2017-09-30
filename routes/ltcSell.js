var express = require("express"),
router = express.Router(),
ltcSell = require('../models/ltcSell'),
middleware = require('../middleware');


router.get("/listings/ltcSell", function(req, res){
ltcSell.find({}, function(err, allltcSells){
    if(err){
        console.log(err);
    } else {
        res.render("listings/ltcSell", {ltcSells: allltcSells, currentUser: req.user, page: 'ltcSells'});
    }
});
});

router.get("/listings/ltcSell/new", middleware.isLoggedIn, function(req, res){
res.render("listings/ltcSellNew");
});

router.post("/listings/ltcSell", middleware.isLoggedIn, function(req, res){
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
ltcSell.create(newListing, function(err, newlyCreated){
    if(err){
        console.log(err);
    } else {
        req.flash("success", "Listing posted successfully!");
        res.redirect("/listings/ltcSell");
    }
})
});

router.get("/listings/ltcSell/:id", function(req, res){
ltcSell.findById(req.params.id).exec(function(err, foundltcSell){
    if(err){
        console.log(err);
    } else {
        res.render("listings/ltcSellShow", { ltcSell: foundltcSell });
    }
})
});

router.delete("/listings/ltcSell/:id", middleware.checkltcSellOwnership, function(req, res){
ltcSell.findByIdAndRemove(req.params.id, function(err){
    if(err){
        req.flash("error", "You don't have permission to do that");
        res.redirect("back");
    } else {
        req.flash("error", "Listing removed successfully!");
        res.redirect("/listings/ltcSell");
    }
});
});

module.exports = router;