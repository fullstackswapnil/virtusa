import mySqlConnection  from "../../../modules/services/MySqlConnection";

class UserModel {
   
    getUsersList = parameter => {
       
        try {
            
            let sqlQuery = "SELECT id from users";
            
            return new Promise( ( resolve, reject ) => {
                mySqlConnection.query( sqlQuery, ( error, result ) => {
    
                    if ( error ) {
                        reject( { success : false, error : "Error in getting user list" } );
                        
                    } else if ( result.length > 0 ) {
                        resolve( { success : true, data : result } );

                    } else {
                        resolve( { success : false, data : result } );
                    } 
        
                } );
            } );
        } catch ( error ) {
            throw new Error( "Error in getting user details", error  );
        }
     }
}

export default UserModel;
