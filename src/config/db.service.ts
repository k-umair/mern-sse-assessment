import mongoose from "mongoose";

class DatabaseService {
  private static instance: DatabaseService;

  private constructor(private dbURI: string) {}

  // Singleton pattern
  public static getInstance(dbURI: string): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(dbURI);
    }
    return DatabaseService.instance;
  }

  // Connect to the database
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbURI);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to Database:", error);
      process.exit(0);
    }
  }

  // Disconnect from the database
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}

export default DatabaseService;
