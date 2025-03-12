import Element from './Element';

class Product extends Element {
  constructor(id, title, price, sale, quantity) {
    super();
    this.id = id;
    this.title = title;
    this.price = price;
    this.sale = sale;
    this.quantity = quantity;
  }

  accept(visitor) {
    visitor.visitProduct(this);
  }
}

export default Product;