import React, { useState , useEffect} from "react";
import CustomHeader from "../Pages/CustomHeader";
import Footer from "../Pages/Footer";
import {getCart, deleteCart} from "../Service/Network";
import ContentLoader, { Facebook } from 'react-content-loader'
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from "../Utils/CartContext";
import toast, { Toaster } from "react-hot-toast";


function Cart() {

  

  const [myCart, setCart] = useState([]);

  const [total , setTotal] = useState(0)

  const cartHandler = (value)=> {
      setCart(value)
  }

const totalHandler =(value)=>{
    setTotal(value)
}

let token = localStorage.getItem('token')

  useEffect(() => {
      getCart(cartHandler, token, totalHandler)
    }, []);




  return (
    <>
      <CustomHeader value="My Basket" ></CustomHeader>
     
     {  
     myCart.length ===0?  
         <div className="z-0 w-full h-auto px-2 py-10 justify-center items-center">
         <ContentLoader />
       </div>:<div className="container mx-auto mt-10">
        <div className="flex flex-col  md:flex-row shadow-md my-10">
          <div className=" w-9/12 bg-white px-5 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-bold  text-green-700  text-2xl">My Basket</h1>
              <h2 className="font-semibold text-2xl">{myCart.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5 w-full">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold md:mx-0 mx-3 text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>


            {
                myCart.map((e)=>{
                  return  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/3 md:w-2/5">
                <div className="w-32">
                  <img
                    className="h-24 w-32"
                    src={e.menu.image}
                    alt=""
                  ></img>
                </div>
                <CartContext.Consumer>{(value)=>{
             return <div className="flex flex-col text-neutral-600 justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{e.menu.title}</span>
                  <span className="text-neutral-600 text-xs">{e.specialty}</span>
                  <a
                    onClick={()=>{
                        setCart([])
                        deleteCart(cartHandler , e._id, value.callCart(), value.setUserDeliveryfeeHandler)
                        
                    }}
                    className=" cursor-pointer text-red-500 text-xs font-bold"
                  >
                    Remove
                  </a>
                </div>
                }}
                </CartContext.Consumer>
              </div>
              <div className="flex justify-center w-1/5 text-neutral-600">
                

                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  value={`${e.quantity}`}
                ></input>

                
              </div>
              
              <span className="text-center mx-2 w-11/12 font-semibold text-sm">
              ₦{e.menu.price}.00
              </span>
              <span className="text-center w-1/5 mr-3 font-semibold text-sm">
              ₦{Number(e.menu.price.toString())*Number(e.quantity.toString())}.00
              </span>
            </div>
                })
            }


           
          </div>

          <div id="summary" className="w-full  text-neutral-600 md:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {myCart.length}</span>
              <span className="font-semibold text-sm">₦{total}</span>
            </div>
           
            <div className="py-10">
              <label
                for="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              ></input>
            </div>
            <button className="bg-green-600 hover:bg-green-700 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₦{
                    
                    total
                    
                    }</span>
              </div>
              <Link
             to={"/checkout"}
           state = {
             {
              menu: myCart,
              total:total,
             }
           } >
              <button className="bg-green-600 font-semibold hover:bg-green-700 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>}
      <Footer></Footer>
    </>
  );
}

export default Cart;
