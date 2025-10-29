import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL as string);
        const url = `${connection.host}:${connection.port}/${connection.name}`;
        console.log(colors.cyan.bold('Database connected to: ' + url));
    } catch (error) {
        console.log(colors.red.bold('Error connecting to the database: ' + error));
        exit(1);
    }
}