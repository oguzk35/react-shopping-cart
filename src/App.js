import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";

import data from "./data.json";

const App = () => {
  const INITIAL_STATE = {
    products: data.products,
    size: "",
    sort: "",
  };

  const [state, setState] = useState(INITIAL_STATE);

  const sortProducts = (event) => {
    console.log(event.target.value);
    const sort = event.target.value;
    setState({
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
    console.log(event.target.value);
    event.target.value === "ALL"
      ? setState({ size: event.target.value, products: data.products })
      : setState({
          ...state,
          size: event.target.value,
          products: data.products.filter(
            (product) => product.availableSizes.indexOf(event.target.value) >= 0
          ),
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
              filterProducts={(e) => filterProducts(e)}
              sortProducts={(e) => sortProducts(e)}
            />
            <Products products={state.products} />
          </div>
          <div className="sidebar">Card items</div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
};

export default App;
