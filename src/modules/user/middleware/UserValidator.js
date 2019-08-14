import Joi          from "joi";

const UserValidator = {};

const createUser = Joi.object().keys( {
    email_id : Joi.string().email().required(),
    first_name : Joi.string().required(),
    last_name : Joi.string().required(),
    mobile : Joi.number().required()
} );

UserValidator.createUser = ( req, res, next ) => {
    Joi.validate( req.body, createUser, ( error, value ) => {
        if ( error ) {
            return res.status(400).send( {
                Error : error.details[0].message
            } );
        }
        next();
    } );
};

export default UserValidator;