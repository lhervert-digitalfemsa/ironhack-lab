import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";
import { InMemoryProductRepository } from "../infrastructure/InMemoryProductRepository";

export class ProductService implements ProductRepository {

  private inMemoryProductRepository: InMemoryProductRepository;

  constructor(repository) {
    this.inMemoryProductRepository = repository;
  }

  addProduct(name: string, price: number, quantity: number) {
    const newProduct = new Product(name, price, quantity);

    this.inMemoryProductRepository.add(newProduct);
  }

  removeProduct(id: number) {
    this.inMemoryProductRepository.remove(id);
  }

  getProduct(id: number): Product | undefined {
    return this.inMemoryProductRepository.getProduct(id);
  }

  getAllProducts(): Product[] {
    return this.inMemoryProductRepository.getAll();
  }

  modifyNameProduct: (id: number, newName: string) => void;
  modifyPriceProduct: (id: number, newPrice: number) => void;
  modifyQuantityProduct: (id: number, newQuantity: number) => void;
}