import { Request, Response } from 'express';
import { productService } from '../../services/productService';
import * as response from '../../utils/response';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.listProducts();
    return response.success(res, products);
  } catch (err: any) {
    return response.error(res, err.message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    return response.success(res, product, 'Product created successfully');
  } catch (err: any) {
    return response.error(res, err.message, 400);
  }
};
