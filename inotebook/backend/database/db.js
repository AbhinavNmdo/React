const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://abhinav:abhinav1234@bazaroffline.0hj24.mongodb.net/inotebook?retryWrites=true&w=majority";

const mongoConnect = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Successfully Connected to MongoDB");
    });
};

module.exports = mongoConnect;