import FilterComponent from './FilterComponent';

class PriceFilter extends FilterComponent {
  constructor(min, max) {
    super();
    this.min = min;
    this.max = max;
  }

  applyFilter() {
    return { min: this.min, max: this.max };
  }
}

export default PriceFilter;