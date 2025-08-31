import Joi from "joi"
import {ApiError} from "../Middlwares/AppError.js"
const validationSchemaConfiguration={
    registrationSchema:Joi.object({
        email:Joi.string().email().required(),
        name:Joi.string().required(),
        password:Joi.string().required().min(8),
        enrollmentNumber:Joi.string().required(),
        branch:Joi.string().required(),
        college:Joi.string().required(),
        role:Joi.string(),
        adminKey:Joi.string()
    }),
    loginSchema:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required().min(8)
    }),
    bookSchema:Joi.object({
        name:Joi.string().required(),
        author:Joi.string().required(),
        ISBN:Joi.number().required(),
        description:Joi.string().required(),
        qty:Joi.number().required()
    })
}

const pathValidationMap={
    "/api/v1/user/signup":validationSchemaConfiguration.registrationSchema,
    "/api/v1/user/login":validationSchemaConfiguration.loginSchema,
    "/api/v1/books":validationSchemaConfiguration.bookSchema
}

export const pathBasedValidation=(req,res,next)=>{


  const validationSchema = pathValidationMap[req.path];
  
  if (!validationSchema) return next();

  const { error } = validationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(400, message));
  }

  next();
}