import dotenv from 'dotenv';

// Load variables early
dotenv.config(); 

// Validate that required variables actually exist
if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI in environment variables");
}

if (!process.env.PORT) {
    throw new Error("Missing PORT in environment variables");
}

// Export a clean, structured object
export const config = {
    port: process.env.PORT,
    dbUri: process.env.MONGO_URI,
    env: process.env.NODE_ENV || 'development'
};