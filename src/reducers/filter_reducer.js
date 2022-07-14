import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import Filters from '../components/Filters';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => {
      return p.price;
    });
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = filtered_products.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts = filtered_products.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = filtered_products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = filtered_products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, price, color, shipping } = state.filters;

    let tempProducts = [...all_products];
    // filterenig
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
    }
    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    // colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    // price
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    });

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }
    console.log('hello');
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        price: state.filters.max_price,
        shipping: false,
        color: 'all',
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
