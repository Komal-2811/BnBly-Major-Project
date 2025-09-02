const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
//schema validation
const { listingSchema } = require("../schema.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

//INDEX ROUTE & CREATE ROUTE
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing));

// NEW ROUTE - form for creating a new listing
router.get("/new",isLoggedIn, listingController.renderNewForm);

// SHOW ROUTE - must come after /listings/new & UPDATE ROUTE & DELETE ROUTE
router.route("/:id")
.get(wrapAsync(listingController.showListings))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
.put(isLoggedIn,upload.single("listing[image]"),validateListing,isOwner,wrapAsync(listingController.updateListing));

//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync( listingController.renderEditForm));

module.exports = router;