import mysql from "mysql2/promise";

export async function GET() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        await connection.query("SELECT 1");

        await connection.end();

        return Response.json({
            success: true,
            message: "Database connected successfully",
        });
    } catch (error: any) {
        return Response.json({
            success: false,
            error: error.message,
            code: error.code,
        });
    }
}