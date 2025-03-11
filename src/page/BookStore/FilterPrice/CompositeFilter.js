import FilterComponent from './FilterComponent';

class CompositeFilter extends FilterComponent {
  constructor() {
    super();
    this.filters = [];
  }

  addFilter(filter) {
    this.filters.push(filter);
  }

  removeFilter(filter) {
    this.filters = this.filters.filter(f => f !== filter);
  }

  applyFilter() {
    return this.filters.reduce((acc, filter) => {
      const result = filter.applyFilter();
      return {
        min: Math.min(acc.min, result.min),
        max: Math.max(acc.max, result.max)
      };
    }, { min: Infinity, max: -Infinity });
  }
}

export default CompositeFilter;