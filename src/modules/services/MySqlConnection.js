import mysql    from "mysql";
import dotenv   from "dotenv";

dotenv.load();

const mySqlConnection = mysql.createConnection( {
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    multipleStatements : true,
    connectTimeout : 1000000
} );

mySqlConnection.connect( ( error ) => {
     
    if ( error ) {
         throw error;
    }
} );

export default mySqlConnection;
 