import Element from './Element';

class Cart extends Element {
  constructor(products, shippingFee, discount) {
    super();
    this.products = products;
    this.shippingFee = shippingFee;
    this.discount = discount;
  }

  accept(visitor) {
    visitor.visitCart(this);
  }
}

export default Cart;