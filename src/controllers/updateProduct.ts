import * as response from './../helpers/response';
import { Request, Response } from "express"
import { Product } from "../schemas/productSchema"
import validator from '../validation/validator';
import { validateUpdateProduct } from '../validation/validate-product';
import { logger } from '../log/logger';

export const updateProduct = async (req: Request, res: Response) => {
    const { productId } = req.params
    try {
        const validation = validator(validateUpdateProduct, req.body);
        if (!validation.status) {
            return response.sendErrorResponse(validation.message, 400);
        }
        const product = await Product.findOne({ _id: productId })
        if(!product) return  res.status(400).send({message:"Product not found"})
        const { name, description, price, quantity } = req.body;
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.quantity = quantity ?? product.quantity;
        await product.save()

       response.sendSuccessResponse("Product updated successfully", product)
    } catch (error:any) {
        logger.debug(`Error: ${error.message}`)
        response.sendErrorResponse(error.message, 500)
    }
}