import mongoose from "mongoose";
const url = process.env.MONGO_URI;


export const connectDB = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Database is connected Successfully");
    }).catch((err) => {
        console.log("Error in connecting with the database: " + err);
    });
};


