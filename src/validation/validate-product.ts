import Joi from "joi";
import { IProduct } from "../types/generic";

export const validateProduct = Joi.object<IProduct>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
}).required();

export const validateUpdateProduct = Joi.object<IProduct>({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
})
