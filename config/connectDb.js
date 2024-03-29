const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
    try {
        //connecting with mongo database
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`${error}`.bgRed);
    }
};

module.exports = connectDb;
