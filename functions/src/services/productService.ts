import { productRepository } from '../repositories/productRepository';

export class ProductService {
  async listProducts() {
    return await productRepository.getAll();
  }

  async createProduct(data: any) {
    // Business Logic: e.g. validate stock minimums
    if (data.stock < 0) throw new Error('Stock cannot be negative');
    return await productRepository.create(data);
  }
}

export const productService = new ProductService();
