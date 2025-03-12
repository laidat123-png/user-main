import Visitor from './Visitor';

class PriceCalculatorVisitor extends Visitor {
  constructor() {
    super();
    this.totalPrice = 0;
  }

  visitProduct(product) {
    const price = product.sale > 0
      ? product.price - (product.price * product.sale) / 100
      : product.price;
    this.totalPrice += price * product.quantity;
  }

  visitCart(cart) {
    cart.products.forEach(product => {
      product.accept(this);
    });
    this.totalPrice += cart.shippingFee;
    this.totalPrice -= cart.discount;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}

export default PriceCalculatorVisitor;