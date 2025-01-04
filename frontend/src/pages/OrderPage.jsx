import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../cartContext/CartContext";
import { API_URL } from "../config/config";
import { totalItem, totalPrice } from "../cartContext/CartReducer";
import "./css/OrderPage.css";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";

function OrderPage() {
  const [slide, setslide] = useState("15%");
  const [stage, setstage] = useState("shipping");
  const [shippingForm, setshippingForm] = useState({});
  const [items, setitems] = useState([]);
  const [paymentMethod, setpaymentMethod] = useState({
    isChecked: false,
    value: "",
  });
  const { cart } = useContext(CartContext);
  const tax = 5 / 100;

  const handleShippingChange = (e) => {
    setshippingForm({
      ...shippingForm,
      [e.target.id]: e.target.value,
    });
  };
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, postalCode, country } = shippingForm;
    if (!address || !name || !city || !postalCode || !country) {
      alert("Please fill all the fields");
      return;
    }
    setstage("payment");
    setslide("50%");
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod.isChecked) {
      alert("Check the payment method first");
      return;
    }
    setstage("previewOrder");
    setslide("100%");
  };
  const makeOrder = ()=>{
    axios.post(`${API_URL}/user/createOrder`, {
        products: cart,
        name: shippingForm.name,
        address: shippingForm.address,
        city: shippingForm.city,
        postalCode: shippingForm.postalCode,
        country: shippingForm.country,
        totalAmount: totalPrice(cart),
    },{headers:{"Authorization": `Bearer ${localStorage.getItem('token')}`}})
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        
    })
  }

  useEffect(() => {
    setitems(cart);
  }, []);
  return (
    <div className="orderPage">
      <div className="orderProgress w-50 m-auto">
        <div className="row mt-5">
          <ul className="list-unstyled d-flex justify-content-between">
            <li>Shipping</li>
            <li>Payment</li>
            <li>Order</li>
          </ul>
          <div
            style={{
              height: "3px",
              width: `${slide}`,
              backgroundColor: "green",
              transition: "all 0.3s ease",
            }}
          ></div>
        </div>
      </div>
      <div className="orderPageBody mt-5">
        {stage === "shipping" ? (
          <div className="w-50 m-auto">
            <form onSubmit={handleShippingSubmit} className="form">
              <label htmlFor="name">Name</label>
              <input
                className="form-control mb-3"
                type="text"
                id="name"
                onChange={(e) => handleShippingChange(e)}
              />
              <label htmlFor="address">Address</label>
              <input
                className="form-control mb-3"
                type="text"
                id="address"
                onChange={(e) => handleShippingChange(e)}
              />
              <label htmlFor="city">City</label>
              <input
                className="form-control mb-3"
                type="text"
                id="city"
                onChange={(e) => handleShippingChange(e)}
              />
              <label htmlFor="postalCode">Postal Code</label>
              <input
                className="form-control mb-3"
                type="text"
                id="postalCode"
                onChange={(e) => handleShippingChange(e)}
              />
              <label htmlFor="country">Country</label>
              <input
                className="form-control mb-3"
                type="text"
                id="country"
                onChange={(e) => handleShippingChange(e)}
              />
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </form>
          </div>
        ) : null}
        {stage === "payment" ? (
          <div className="payment w-50 m-auto">
            <h3>Payment</h3>
            <div className="mb-3">
              <input
                className="me-2"
                type="checkbox"
                name="payPal"
                id="payPal"
                onChange={(e) => {
                  e.target.checked
                    ? setpaymentMethod({
                        isChecked: e.target.checked,
                        value: e.target.id,
                      })
                    : setpaymentMethod({
                        isChecked: e.target.checked,
                        value: "",
                      });
                }}
              />
              <label htmlFor="payPal">PayPal</label>
            </div>
            <button onClick={handlePaymentSubmit} className="btn btn-primary">
              Continue
            </button>
          </div>
        ) : null}
        {stage === "previewOrder" ? (
          <div className="previewOrder">
            <h2>Preview Order</h2>
            <div className="row justify-content-between">
              <div className="col-md-8">
                <div className="shipping rounded-2 shadow mb-3 p-3">
                  <h5>Shipping</h5>
                  <h6>Name : {shippingForm.name ? shippingForm.name : ""}</h6>
                  <h6>
                    Address :{" "}
                    {shippingForm.address
                      ? `${shippingForm.address},${shippingForm.city},${shippingForm.postalCode},${shippingForm.country}`
                      : ""}
                  </h6>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setstage("shipping");
                      setslide("15%");
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="payment rounded-2 shadow mb-3 p-3">
                  <h5>Shipping</h5>
                  <h6>Method : {paymentMethod.value}</h6>
                </div>
                <div className="items rounded-2 shadow mb-3 p-3">
                  <h5>Items</h5>
                  {items
                    ? items.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="row align-items-center mb-3"
                          >
                            <div className="col-md-2">
                              <img
                                src={`${API_URL}${item.image}`}
                                style={{ height: "5rem" }}
                                alt="item_image"
                              />
                            </div>
                            <div className="col-md-4">
                              <h6>{item.name}</h6>
                            </div>
                            <div className="col-md-3">{item.quantity}</div>
                            <div className="col-md-3">
                              {item.price * item.quantity}
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="col-md-3">
                <div className="orderSummary p-4 px-5 shadow rounded-2">
                  <h5 className="mb-4">Order Summary</h5>
                  <div className="row m-0 mb-2">
                    <div className="col-md-6 m-0">
                      <p>Items</p>
                    </div>
                    <div className="col-md-6 m-0">Rs. {totalPrice(cart)}</div>
                  </div>
                  <hr />
                  <div className="row m-0 mb-2">
                    <div className="col-md-6 m-0">
                      <p>Shipping</p>
                    </div>
                    <div className="col-md-6 m-0">Rs. 0</div>
                  </div>
                  <hr />
                  <div className="row m-0 mb-2">
                    <div className="col-md-6 m-0">
                      <p>Tax</p>
                    </div>
                    <div className="col-md-6 m-0">
                      Rs. {totalPrice(cart) * tax}
                    </div>
                  </div>
                  <hr />
                  <div className="row m-0 mb-2">
                    <div className="col-md-6 m-0">
                      <p>Order Total</p>
                    </div>
                    <div className="col-md-6 m-0">
                      Rs. {totalPrice(cart) + totalPrice(cart) * tax}
                    </div>
                  </div>
                  <hr />
                  <div className="paypalButtonContainer d-grid m-0 mb-2">
                    <PaypalCheckoutButton onclick={makeOrder} product={totalPrice(cart)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OrderPage;
