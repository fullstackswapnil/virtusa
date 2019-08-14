import request from "supertest";
import app     from "../src/app";

describe(' GET /users', function () {
    it( 'list of all users', function ( done ) {
        request( app )
            .get( '/users/list' )
            .set('Accept', 'application/json' )
            .expect( 'Content-Type', /json/ )
            .expect( 200, done );
    } );
} );

describe( 'POST /users', function () {
    
    let userData = {
        "email_id" : "swapnilsakha2@gmail.com",
        "first_name": "swapnil",
        "last_name": "kulkarni",
        "mobile_number": "8055519911"
    }
    
    it( 'respond with 201 created', function ( done ) {
        
        request( app )
            .post( '/users' )
            .send( userData )
            .set( 'Accept', 'application/json' )
            .expect( 'Content-Type', /json/ )
            .expect( 201 )
            .end( ( err ) => {
                if ( err ) return done( err );
                done();
            } );
    } );
} );

 