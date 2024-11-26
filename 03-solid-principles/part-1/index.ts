//Inteface Segregation Principle
interface Item {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentProcessor {
  applyDiscount(price: number): number
}

interface Discount {
  applyDiscount(price: number): number;
}


// Single Responsibility Principle
// This class is responsible for managing the shopping cart
class ShoppingCart {

  private items: Item[] = [];
  addItem(item: Item): void {
    this.items.push(item);
  }

  calculateTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getItems(): Item[] {
    return this.items;
  }


}

class Checkout {
  constructor(
    private paymentProcessor: PaymentProcessor,
    private discount?: Discount
  ) { }

  process(cart: ShoppingCart): number {
    let total = cart.calculateTotal();
    if (this.discount) {
      total = this.discount.applyDiscount(total);
    }
    return this.paymentProcessor.applyDiscount(total);
  }
}

class ConsolePaymentProcessor implements PaymentProcessor {
  applyDiscount(price: number): number {
    console.log(`Price: ${price}`);
    return price;
  }
}
// Open/Closed Principle
// This class is responsible for applying a percentage discount
class PercentageDiscount implements Discount {
  constructor(private percentage: number) { }

  applyDiscount(price: number): number {
    return price - price * this.percentage / 100;
  }
}


///Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Laptop', price: 1000, quantity: 1 });
cart.addItem({ name: 'Mouse', price: 20, quantity: 2 });

const paymentProcessor = new ConsolePaymentProcessor();
const discount = new PercentageDiscount(10);
const checkout = new Checkout(paymentProcessor, discount);