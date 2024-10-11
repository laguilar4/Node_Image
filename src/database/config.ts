import mongoose from "mongoose";
import * as dotenv from "dotenv";

const port: string | undefined = process.env.PORTDB;

// database connect
export async function connectMongo() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Docportal").then(() => console.log('Mongodb Connected!'));;
    } catch (error) {
        console.log(`failed to connect database ${error}`);
    }
}
