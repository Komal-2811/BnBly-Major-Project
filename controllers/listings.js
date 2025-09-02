const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "review", populate: { path: "author" }, }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};
module.exports.createListing = async (req, res, next) => {//firstly validation will be done then wrapasync etc will be proceeded
    let url = req.file.path;
    let filename = req.file.filename;
    //console.log(url,"..",filename);
    let listing = req.body.listing;
    const newlisting = new Listing(listing);
    newlisting.owner = req.user._id;//to show owned by user name for new listings
    newlisting.image = { url, filename };
    await newlisting.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
    //console.log(listing);
};
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250,c_fill");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
};
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });//deconsrtuct krke unhe individual obj me convert krenge
    if(typeof req.file!=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}