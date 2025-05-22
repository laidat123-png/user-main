class CartTemplate {
  // Template method
  processCart() {
    this.addProduct();
    this.updateProductQuantity();
    this.removeProduct();
  }

  addProduct() {
    throw new Error("This method must be overridden!");
  }

  updateProductQuantity() {
    throw new Error("This method must be overridden!");
  }

  removeProduct() {
    throw new Error("This method must be overridden!");
  }
}

export default CartTemplate;