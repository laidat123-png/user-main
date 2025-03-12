class Element {
    accept(visitor) {
      throw new Error("This method must be overridden!");
    }
  }
  
  export default Element;