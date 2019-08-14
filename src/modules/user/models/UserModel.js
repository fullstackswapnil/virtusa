import mySqlConnection  from "../../../modules/services/MySqlConnection";
import datetime         from "node-datetime";

class UserModel {
   
    createUser = parameters => {
       
        try {
            
            let date           = datetime.create();
            let created_on     = date.format( "Y-m-d H:M:S" );
    
            let sqlQuery       = "INSERT INTO users ( email_id, first_name, last_name, mobile_number, created_on ) VALUES ( ?, ?, ?, ?, ? )";
            let sqlParameter   = [ parameters.email_id, parameters.first_name, parameters.last_name, parameters.mobile, created_on ]
            
            return new Promise( ( resolve, reject ) => {
                
                mySqlConnection.query( sqlQuery, sqlParameter,  ( error, result ) => {
    
                    if ( error ) {
                        reject( { error : "Error Inserting record." } );
                        
                    } else if ( result.affectedRows > 0 ) {
                        resolve( { success : true, data : result } );

                    } else {
                        resolve( { success : false, data : result } );
                    } 
        
                } );
            } );
        } catch ( error ) {
            throw new Error( "Error in creating user", error );
        }
    }

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
