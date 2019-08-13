import express          from "express";
import UserController   from "../controllers/UserController";
import Authentication   from "../../middleware/Authentication";
 
const UserRoute         = express.Router(); 
const objUser           = new UserController();
const objAuth           = new Authentication();

UserRoute.get( "/users/list", objAuth.authentication, objUser.getAllUser );

export default UserRoute;
