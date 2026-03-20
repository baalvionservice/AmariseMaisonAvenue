export class ProductRepository {
  async getAll() {
    // MOCK: Replace with Firestore collection('products').get()
    return [
      { id: 'prod_001', title: 'HSS Birkin 25', price: 31000, stock: 1 },
      { id: 'prod_002', title: 'Kelly 28 Sellier', price: 24000, stock: 2 }
    ];
  }

  async create(data: any) {
    // MOCK: Replace with Firestore add()
    return { id: 'prod_new_' + Date.now(), ...data, createdAt: new Date() };
  }
}

export const productRepository = new ProductRepository();
