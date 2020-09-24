import React, { useState, useEffect } from "react";
import Products from "./components/Products";

import data from "./data.json";

const App = () => {
  const INITIAL_STATE = {
    data: data.products,
    size: "",
    sort: "",
  };

  const [state, setState] = useState(INITIAL_STATE);

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={state.data} />
          </div>
          <div className="sidebar">Card items</div>
        </div>
      </main>
      <footer>All right is reserved.</footer>
    </div>
  );
};

export default App;
