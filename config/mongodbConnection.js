import mongoose from "mongoose";
export const getConnectionToMongoDB = async (connectionString) => {
    try {
        await mongoose.connect(connectionString || "mongodb://localhost:27017/");
        console.log(
            ` MongoDB Successfully Connected to ${
                connectionString ? "MongoDB Atlas Cloud " : "mongodb://localhost:27017/"
            }`.bgMagenta
        );
    } catch (err) {
        console.log(`${err.message}`);
    }
};
