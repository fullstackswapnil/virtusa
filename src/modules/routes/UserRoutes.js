import express              from "express";
import userRoutes           from "../user/routes/UserRoute";

const UserRoutes            = express.Router();

UserRoutes.use( "/user",    userRoutes );
 
export default UserRoutes;
