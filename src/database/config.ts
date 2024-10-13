import mongoose from "mongoose";
import * as dotenv from "dotenv";

const port: string | undefined = process.env.PORTDB;

// database connect
export async function connectMongo() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Docportal").then(() => console.log('Mongodb Connected!'));;
    } catch (error) {
        console.error(`Error de conexión: ${error}`);
        process.exit(1);
    }
}

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada');
    } catch (error) {
        console.error(`Error al cerrar la conexión: ${error}`);
    }
};

export const ConnMongo = async () => {
    await connectMongo();
    await closeDB();
};

export const saveSchema = async (Schema: { save: () => any; }) => {
    await connectMongo();
    const result = Schema.save();
    await closeDB();
    return result;
};