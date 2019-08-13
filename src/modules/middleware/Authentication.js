import jwt              from "jsonwebtoken";
import https            from "https";
import _                from "underscore";
import jose             from "node-jose";

dotenv.load();

class Authentication {

    constructor() {

         https.get( this.keysUrl, ( response ) => {

             if ( response.statusCode == 200 ) {

                 response.on( "data", ( body ) => {

                    this.keys = JSON.parse( body )["keys"];
                   
                    if ( !this.keys.length > 0 ) {
                         process.exit();
                    }
                } );

             } else {
             
                process.exit();

            }
        } );
        
    }

    authentication = async ( req, res, next ) => {

        try {
            
            const auth = req.headers["x-access-token"];
            const token = auth.split( " " )[1];
           
            const decoded = jwt.decode( token, { complete : true } );

            const key = _.findWhere( this.keys, { kid : decoded.header.kid } );

            const decodedParse = decoded.payload;

            const tokenEmail = decodedParse["email"];

            let tokenUid;

            let tokenIss;
 
            jose.JWK.asKey( key )
                .then( ( publicKey ) => {

                    jose.JWS.createVerify( publicKey )
                        .verify( token )
                        .then( ( decoded ) => {
                            
                            const decodedToken = JSON.parse( decoded.payload );
                            const currentTs = Math.floor( new Date() / 1000 );

                            if ( currentTs > decodedToken["exp"] ) {
 
                                res.status( 401 )
                                    .send( `401, "Token Expired.", null`  );

                            } else if ( decodedToken["iss"] != this.issuer ) {

                             
                                res.status( 401 )
                                .send( `401, "Token Expired.", null`  );
                            } else {
                                
                                if ( tokenIss == null || tokenIss == undefined ) {
                                        tokenUid = decodedToken["sub"]
                                }
 
                                next( );
                            }

                        } );
                } );
         } catch ( error ) {

            res.status( 401 )
            .send( `401, "Token Expired.", null`  );
        }
    }
}

export default Authentication;