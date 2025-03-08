import { toast } from 'react-toastify';
import CartTemplate from './CartTemplate';

class OnlineCart extends CartTemplate {
  constructor(cart, dispatch, toastConfig, deleteProductInCartRequest) {
    super();
    this.cart = cart;
    this.dispatch = dispatch;
    this.toastConfig = toastConfig;
    this.deleteProductInCartRequest = deleteProductInCartRequest;
  }

  addProduct() {
    console.log("Adding product to online cart...");
    // Logic to add product to online cart
  }

  updateProductQuantity(amount) {
    console.log("Updating product quantity in online cart...");
    // Logic to update product quantity in online cart
    if (amount > 0 && amount <= this.cart.product.inStock) {
      this.cart.quantity = amount;
    } else if (amount > this.cart.product.inStock) {
      toast("Số lượng hiện tại cao hơn số lượng hàng tồn!", this.toastConfig);
    }
  }

  removeProduct() {
    console.log("Removing product from online cart...");
    // Logic to remove product from online cart
    this.deleteProductInCartRequest(this.dispatch, this.cart.product._id);
  }
}

export default OnlineCart;