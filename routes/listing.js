const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); 

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );
  //Searched Listing
router.post("/searchedListing",async(req,res)=>{
  
  let {countryName} = req.body;
  const searchedListings = await Listing.find({
  country: { $regex: countryName, $options: "i" }
});
  console.log(searchedListings);
  if (searchedListings<1) {
    req.flash("error", "Listing for your requested country does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/searchedListing.ejs",{ searchedListings });
 
  
})

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
   
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//Index Route



//Show Route


//Create Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


//Update Route


//Delete Route


module.exports = router;
