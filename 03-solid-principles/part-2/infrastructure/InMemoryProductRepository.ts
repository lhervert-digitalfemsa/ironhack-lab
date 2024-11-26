import { Product } from "../domain/Product";

export class InMemoryProductRepository {
  private products: Product[] = [];

  async add(product: Product): Promise<Product[]> {
    this.products.push(product);
    return this.getAll();
  }

  async remove(id: number): Promise<Product[]> {
    this.products = this.products.filter((product) => product.getId() !== id);
    return this.getAll();
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.getId() === id);
  }

  getAll(): Product[] {
    return this.products;
  }
}

