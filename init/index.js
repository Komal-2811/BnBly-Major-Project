const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const url='mongodb://127.0.0.1:27017/UrbanRetreats';
async function main() {
    await mongoose.connect(url);
};
main().then(()=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err);
})
//initialize database function
const initdb=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"68af402daecfc72c794a071d"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initdb();