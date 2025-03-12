class Visitor {
    visitProduct(product) {
      throw new Error("This method must be overridden!");
    }
  
    visitCart(cart) {
      throw new Error("This method must be overridden!");
    }
  }
  
  export default Visitor;