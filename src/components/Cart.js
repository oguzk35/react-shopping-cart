import React from "react";
import formatCurrency from "./util";

const Cart = (props) => {
  const { cartItems } = props;
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} products in the cart.
        </div>
      )}
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>{item.title}</div>
                <div className="right">
                  {formatCurrency(item.price)} x {item.count}{" "}
                  <button
                    className="button"
                    onClick={(e) => props.removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length > 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total :
                {cartItems
                  .reduce((total, item) => total + item.price * item.count, 0)
                  .toFixed(2)}
              </div>
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
