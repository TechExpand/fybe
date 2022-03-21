import logo3 from "../image/2.png";
import Footer from "./Footer";
import CustomHeader from "../Pages/CustomHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addCart,checkUserVendor } from "../Service/Network";
import "../Pages/Vendor.css";
import React from "react";
import { CartContext } from "../Utils/CartContext";
import Modal from "../UI/Dialog";

function VendorPage() {
  const contextValue = useContext(CartContext);
  const location = useLocation();
  const vendorData = location.state.vendor;
  const menuData = location.state.menu;
  const [load, setLoad] = useState(false);
  const notify = (message) => toast(message);
  const [counter, setCounter] = useState(1);

  const addToCart = () => {
    let userID = localStorage.getItem("id");
    setLoad(true);
    addCart(
      {
        user: userID,
        menu: vendorData.trend?menuData.menu:menuData._id,
        specialty: vendorData.specialty,
        quantity: counter.toString(),
      },
      setLoad,
      notify,
      contextValue.setUserDeliveryfeeHandler,
    );
  };


  


  const checkUserVendorHandler = () => {
    let userID = localStorage.getItem("id");
    setLoad(true);
    checkUserVendor(
      {
        user: userID,
        vendor: vendorData._id?vendorData._id:menuData.vendor._id,
      },
      setLoad,
      notify,
      contextValue.setShowModal,
      addToCart,
      contextValue.setUserDeliveryfeeHandler,
    );
  };

  //increase counter
  const increase = () => {
    // console.log(menuData)
    setCounter((count) => count + 1);
  };

  //decrease counter
  const decrease = () => {
    if (counter > 1) {
      setCounter((count) => count - 1);
    }
  };

  return (
    <div>
    <Toaster />
    <Modal addToCart = {addToCart} setLoad={setLoad}/>
      <div>
        <CustomHeader/>
       

        <div className="w-full  h-screen container z-0">
          <div
            style={{
              backgroundImage: `url("${menuData.image}")`,
            }}
            className=" mt-4 rounded-b-md bg-cover bg-no-repeat w-full bg-white shadow-2xl flex  justify-end items-end h-3/5  md:h-3/4 relative z-0"
          >
            <div className=" rounded-b-md rounded-t-lg  bg-green-600 h-56 w-full inset-0 flex justify-center items-center bg-opacity-75 z-10">
              <div className="flex gap-3 justify-start items-start flex-col text-white">
                <div className="text-2xl font-bold">
                 
                  {menuData.title.toString().toUpperCase().charAt(0) +
                    menuData.title.toString().slice(1)}
                </div>
                <div className="text-lg font-bold">
                  {" "}
                  <FontAwesomeIcon
                    className="text-sm text-white "
                    icon={faClock}
                  />{" "}
                  {vendorData.deliverytime?vendorData.deliverytime:"15-20"} mins
                </div>
                <div className="text-lg font-bold">
                  Price : ₦ {menuData.price}
                 
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="counter">
              <span className="text-neutral-600 text-center text-3xl pt-4">{counter}</span>
              <div className="btn__container">
                <button className="control__btn" onClick={increase}>
                  +
                </button>
                <button className="control__btn" onClick={decrease}>
                  -
                </button>
              </div>
            </div>

            <div className="text-3xl mt-4 mb-1 text-neutral-600 font-bold">
              {menuData.title.toString().toUpperCase().charAt(0) +
                menuData.title.toString().slice(1)}
            </div>
            <div className="text-md text-neutral-600 font-normal">{menuData.description}</div>
            <div className=" py-10 flex flex-col w-full justify-center items-center">
          <CartContext.Consumer>{(value)=>{
  return    <div 
  onClick={
      ()=>{
        if(localStorage.getItem('token')){
          // addToCart()
          checkUserVendorHandler()
          value.callCart()
        }else{
          notify('You need to Login or Sign up')
        }
      }
  }
  className="px-3.5 w-40 py-2 transition ease-in font-bold text-lg duration-200 uppercase rounded-full bg-neutral-600 text-white border-2 border-gray-900 focus:outline-none  right-4 flex items-center justify-center">
  
    <div class="flex items-center pr-1 justify-center ">
    <div class={`w-6 h-6 border-b-2 border-white rounded-full animate-spin ${load?"inline-block":"hidden"}`}></div>
</div>

    <button>Add to cart</button>
  </div>
}}
      
        </CartContext.Consumer>
        
          </div>
          <Footer></Footer>
          </div>
          
        </div>

        


      </div>

     
    </div>
  );
}

export default VendorPage;
