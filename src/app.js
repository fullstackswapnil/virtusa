import express      from "express";
import cors         from "cors";
import helmet       from "helmet";
import bodyParser   from "body-parser";
import UserRoutes   from "./modules/routes/UserRoutes";

const app           = express();

app.use( cors() );
app.use( helmet() );
app.use( bodyParser.json( { limit : "50mb" } ) );
app.use( bodyParser.urlencoded( { extended : false } ) );
app.use( express.json() )

app.use( "/api", UserRoutes );

export default app;
