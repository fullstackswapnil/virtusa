import express          from "express";
import UserController   from "../controllers/UserController";
import Authentication   from "../../middleware/Authentication";
import UserValidator    from "../middleware/UserValidator";
 
const UserRoute         = express.Router(); 
const objUser           = new UserController();
const objAuth           = new Authentication();

UserRoute.get( "/users/list", objAuth.authentication, objUser.getAllUsers );
UserRoute.post( "/user",      objAuth.authentication, UserValidator.CreateUser, objUser.createUser );

export default UserRoute;
