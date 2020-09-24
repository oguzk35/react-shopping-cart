import React, { useState, useEffect } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";

import data from "./data.json";

const App = () => {
  const INITIAL_STATE = {
    products: data.products,
    size: "",
    cartItems: [],
    sort: "",
  };

  const [state, setState] = useState(INITIAL_STATE);

  const sortProducts = (event) => {
    const sort = event.target.value;
    setState({
      ...state,
      sort: sort,
      products: state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    });
  };

  const filterProducts = (event) => {
    event.target.value === "ALL"
      ? setState({
          ...state,
          size: event.target.value,
          products: data.products,
        })
      : setState({
          ...state,
          size: event.target.value,
          products: data.products.filter(
            (product) => product.availableSizes.indexOf(event.target.value) >= 0
          ),
        });
  };

  const addToCart = (product) => {
    setState({
      ...state,
      cartItems: state.cartItems.find((item) => item._id === product._id)
        ? state.cartItems.map((item) =>
            item._id === product._id ? { ...item, count: item.count + 1 } : item
          )
        : [...state.cartItems, { ...product, count: 1 }],
    });
  };

  const removeFromCart = (product) => {
    setState({
      ...state,
      cartItems: state.cartItems.filter((item) => item._id !== product._id),
    });
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={state.products.length}
              sort={state.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products
              products={state.products}
              addToCart={(e) => addToCart(e)}
            />
          </div>
          <div className="sidebar">
            <Cart cartItems={state.cartItems} removeFromCart={removeFromCart} />
          </div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
};

export default App;
