import oracledb, { Connection, ConnectionAttributes } from 'oracledb';
import dotenv from 'dotenv';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

dotenv.config();

async function fun() {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        const data = await connection.execute(
            `Select * from teste`,
        );
        console.log(data.rows);

    } catch (err) {
        console.log(err);
    }
} 
fun();