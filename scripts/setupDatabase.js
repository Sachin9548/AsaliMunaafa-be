const User = require("../models/user");

// Load environment variables
const dotenv = require("dotenv");
dotenv.config();

async function createDatabaseWithSchemas() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create collections based on models
    await Favorite.createCollection();

    console.log("Collections created successfully.");
  } catch (error) {
    console.error("Error creating database", error);
  } finally {
    // Ensure the Mongoose connection is closed when done
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

createDatabaseWithSchemas();