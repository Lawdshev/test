import * as response from './../helpers/response';
import { Request, Response } from "express";
import { Product } from "../schemas/productSchema";
import { logger } from '../log/logger';

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ productId });
        if(!product) return response.sendErrorResponse("Product not found", 404)
        response.sendSuccessResponse("Product found successfully", product)
  }
    catch (error: any) {
    logger.debug(`Error: ${error.message}`)
    response.sendErrorResponse(error.message, 500)
  }
};
