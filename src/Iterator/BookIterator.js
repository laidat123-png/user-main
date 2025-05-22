import Iterator from './Iterator.js';

class BookIterator extends Iterator {
  constructor(books) {
    super();
    this.books = books;
    this.index = 0;
  }

  next() {
    if (this.hasNext()) {
      return this.books[this.index++];
    }
    return null;
  }

  hasNext() {
    return this.index < this.books.length;
  }

  reset() {
    this.index = 0;
  }
}

export default BookIterator;