import "./App.css";
import HomePage from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import VendorPage from "./components/Pages/Vendor";
import VendorMenu from "./components/Pages/VendorMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import { CartContext } from "./components/Utils/CartContext";
import React, { useState, useEffect } from "react";
import { getCart, getAmount ,getUserDeliveryAmount} from "./components/Service/Network";
import AllVendors from "./components/Pages/AllVendors";
import Orders from "./components/Pages/Orders";
import PrivateRoute from "./components/Utils/PrivateRoute";
import CheckLogin from "./components/Utils/CheckLogin";
import Forget from "./components/Pages/Forget";

function App() {
  const [myCart, setCart] = useState([]);

  const [total, setTotal] = useState(0);

  const [deliveryfee, setDeliveryfee] = useState(0);

  const [userdeliveryfee, setUserDeliveryfee] = useState(0);

  

  const [showModal, setShowModal] = useState(false);

  const cartHandler = (value) => {
    setCart(value);
  };

  const totalHandler = (value) => {
    setTotal(value);
  };

  const callCart = () => {
    getCart(cartHandler, token, totalHandler);
  };


 const setUserDeliveryfeeHandler = ()=>{
    getUserDeliveryAmount(setUserDeliveryfee)
  }

  const setShowModalHandler = (value)=>{
    setShowModal(value);
    console.log(value)
  }


  let token = localStorage.getItem("token");

  useEffect(() => {
    getCart(cartHandler, token, totalHandler);
    getAmount(setDeliveryfee);
    getUserDeliveryAmount(setUserDeliveryfee);
  }, []);

  return (
    // <>
    //  <Login></Login>
    // </>
    <CartContext.Provider
      value={{ callCart: callCart,
         myCart: myCart,
         deliveryfee: deliveryfee,
         showModal:showModal,
         setShowModal:setShowModalHandler,
         setUserDeliveryfeeHandler:setUserDeliveryfeeHandler,
         userdeliveryfee: userdeliveryfee,

        }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          {/* <PrivateRoute path="/" element={<HomePage/>} exact/> */}
          <Route path="/vendor" element={<VendorMenu />} />
          <Route path="/menu" element={<VendorPage />} />
          <Route path="/vendors" element={<AllVendors />} />
        

          <Route element={<CheckLogin />}>
            <Route path="/forget" element={<Forget />} /> 
          </Route>

          <Route element={<CheckLogin />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<CheckLogin />}>
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/order" element={<Orders />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
