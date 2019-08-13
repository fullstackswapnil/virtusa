#!/usr/bin/env node
import http   from "http";
import app    from "../src/app";
import logger from "../src/lib/logger";
import dotenv from "dotenv";

dotenv.load();

const normalizePort = ( val ) => {
    let port = parseInt( val, 10 );
  
    if ( isNaN( port ) ) {
      return val;
    }
  
    if ( port >= 0 ) {
      return port;
    }
  
    return false;
}


const onError = ( error ) => {
    if ( error.syscall !== "listen" ) {
      throw error;
    }
  
    let bind = typeof port === "string"
      ? "Pipe " + port
      : "Port " + port;
  
    switch( error.code ) {
      case "EACCES" :
        logger.error( bind + " requires elevated privileges" );
        process.exit( 1 ); 
        break;
      case "EADDRINUSE":
        logger.error( bind + " is already in use" );
        process.exit( 1 );
        break;
      default:
        throw error;
    }
  }

const onListening = () => {
    let address = server.address();
    let bind = typeof address === "string" ? "pipe " + address : "port " + address.port;
    logger.info( "Listening on " + bind );
  }

const port = normalizePort( process.env.NODE_SERVER_PORT || "5001" );
app.set( "port", port );

let server = http.createServer( app );
server.listen( port );
server.on( "error", onError );
server.on( "listening", onListening );
