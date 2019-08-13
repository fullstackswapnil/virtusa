import UserModel         from "../models/UserModel";
 


class UserController {
    
    constructor() { 
        this.userModel = new UserModel();
    }
    getAllUser = async ( req, res, next ) => {
        
        try { 
                let queryResult = await this.userModel.getUsersList( req.body );
                
                if ( queryResult && queryResult.success ) {
                    
                    res.status( 200 )
                        .send(  queryResult );
                    
                } else {
                    res.status( 204 )
                        .send( `No Content`  ); 
                }

            } catch ( error ) {
    
                res.status( 500 )
                    .send( "Internal server error" ) ;
        } 
    }  
}

export default UserController;
