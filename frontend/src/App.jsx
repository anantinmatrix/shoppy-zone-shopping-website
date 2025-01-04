import "./App.css";
import SignUp from "./pages/SignUp";
import Notification from "./components/Notification";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { NotificationProvider } from "./NotificationProvider";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const [token, settoken] = useState("");
  const [paidFor, setPaidFor] = useState(false)
  const [error , setError] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    }

    const handleApprove = (orderID)=>{
      // Call backend function to fulfill order

      // if response id successfull
      setPaidFor(true);
      // refresh user's account or subscription status

      // if the response is error
      alert("Your payment was processed successfully. However, we are unable to fulfill the purchase.")
    }

    if(paidFor){
      // Display success message, modal or redirect user to the success page
      alert('Thank you for your purchase')
    }
    if(error){
      // Display error message
      alert(error)
    }
  }, [token]);
  return (
    <div>
      <PayPalScriptProvider
      onClick={(data,actions)=>{
        const hasAlreadyBought = true
        if(hasAlreadyBought){
          setError("You already bought this item, Go to your account to view the list of items")
          return actions.reject()
        }else{
          return actions.resolve()
        }
      }}
        options={{ "client-id": `AR3gNJwjlUbjqG1BbUO80mV1S_S_W60a15vYBdIy-N23R9q2gCB_XAJWG452dtpmA5y3LiX8hrSLVwJI` }}
        createOrder ={(data,actions)=>{
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: product.price
                }
              }
            ]
          })
        }}
        onApprove={async(data,actions)=>{
          const order = await actions.order.capture()
          console.log("order", order)
          handleApprove(data.orderID)
        }}
        onCancel={()=>{
          // display cancel message, or redirect to cancel page
        }}
        onError={(err)=>{
          setError(err);
          console.error("Paypal checkout error", err)
        }}
      >
        <NotificationProvider>
          <NavigationBar />
          <div className="outlet">
            <Outlet />
          </div>
        </NotificationProvider>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
