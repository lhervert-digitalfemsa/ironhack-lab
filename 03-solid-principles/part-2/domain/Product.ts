export class Product {
  private id: number;
  private name: string;
  private price: number;
  private quantity: number;
  constructor(name: string, price: number = 0, quantity: number = 1) {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

}