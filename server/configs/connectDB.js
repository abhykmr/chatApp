const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected to the database!");
    });
    connection.on("error", (error) => {
      console.log("An error occuring while connecting to the database");
    });
  } catch (error) {
    console.log("Some error occured: ", error);
  }
};

module.exports = connectDB;
