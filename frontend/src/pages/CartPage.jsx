import React, { useContext } from "react";
import { CartContext } from "../cartContext/CartContext";
import { showNotification } from "../NotificationProvider";
import { totalItem, totalPrice } from "../cartContext/CartReducer";
import { useNavigate } from "react-router-dom";


function CartPage() {
  const { cart, dispatch } = useContext(CartContext);
  console.log(cart);
  const navigate = useNavigate()


  const increase = (id) => {
    const index = cart.findIndex((i) => i._id === id);
    console.log(cart[index]);
    if (cart[index].quantity < 10) {
      dispatch({ type: "Increase", _id: id });
    }
    if (cart[index].quantity < 1) {
      dispatch({ type: "Remove" });
    }
  };
  const decrease = (id) => {
    const index = cart.findIndex((i) => i._id === id);
    if (cart[index].quantity > 1) {
      dispatch({ type: "Decrease", _id: id });
    } else if (cart[index].quantity < 0) {
      showNotification("error", "Quantity cannot be negative", 3);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-evenly">
        <div className="w-50">
          <h2>Cart Items</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div
                      className="d-grid w-100"
                      style={{
                        gridTemplateColumns: "1fr 1fr 1fr 2fr",
                        placeItems: "center",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => decrease(item._id)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-primary"
                        onClick={() => increase(item._id)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch({ type: "Remove", _id: item._id })
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="summary w-25 bg-opacity-25 bg-dark-subtle p-3 rounded-2">
          <h2>Summary</h2>
          <div className="mt-3 mb-4">
            <h5>Total Items :{totalItem(cart)}</h5>
            <h5>Total Amount :{totalPrice(cart)}</h5>
          </div>
          {
            totalItem(cart)>0 ?
            <button onClick={()=> {localStorage.getItem('token') ? navigate('/orders') : navigate('/signup')}} className="btn btn-primary">Place Order</button>
            :
            <p>No order to place</p>
        }
        </div>
      </div>
    </div>
  );
}

export default CartPage;
