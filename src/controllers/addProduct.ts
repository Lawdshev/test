import { Request, Response } from "express";
import { Product } from "../schemas/productSchema";
import validator from "../validation/validator";
import { validateProduct } from "../validation/validate-product";
import * as response from "../helpers/response";
import { logger } from "../log/logger";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const validation = validator(validateProduct, req.body);
    if (!validation.status) {
      return response.sendErrorResponse(validation.message, 400);
    }
    const newProduct = new Product(req.body);

    await newProduct.save();

    logger.debug("Product created successfully", newProduct);
    return response.sendSuccessResponse(
      "Product created successfully",
      newProduct
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
