import CustomHeader from "../Pages/CustomHeader";
import { useLocation } from "react-router-dom";
import { useReducer, useState } from "react";
import Footer from "../Pages/Footer";
import { PaystackConsumer } from "react-paystack";
import { useNavigate } from "react-router-dom";
import {
  reducerCheckOut,
  initialCheckOutState,
  validateCheckOutInput,
  onCheckOutFocusOut,
  onInputCheckOutChange,
} from "../Utils/checkOutForm";
import { checkPaymentReference } from "../Service/Network";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../Utils/CartContext";
import React, { useContext } from 'react';


function Checkout() {

 const value = useContext(CartContext);
  const history = useNavigate();
  const notify = (message) => toast(message);
  const location = useLocation();
  const total = location.state.total;
  const menuData = location.state.menu;
  const [showError, setShowError] = useState(false);
  const [formState, dispatch] = useReducer(
    reducerCheckOut,
    initialCheckOutState
  );

  const vendorNames = new Set();

  function getVendorNames() {
    menuData.forEach(function (item, index) {
      vendorNames.add(item.menu.vendor.name);
    });
  }

  let finalTotal = total + value.deliveryfee + value.userdeliveryfee

  const config = {
    reference: new Date().getTime().toString(),
    email: localStorage.getItem("email"),
    amount: finalTotal   * 100,
    publicKey: "pk_live_59dd820e33debaa3be28a2d6812b2a61689be9ed",
  };

  // you can call this function anything
  const handleSuccess = (reference) => {
      console.log(reference)
      toast("order successful")
      value.callCart([])
    checkPaymentReference(
        {
          phone: formState.phone.value,
          nearestbusstop: formState.nearest.value,
          deliverylocation: formState.delivery.value,
          description:formState.description.value,
          vendor: vendorNames
            .toString()
            .substring(1, vendorNames.toString().length - 1),
          user: localStorage.getItem("id"),
        },
        notify,
        history,
        reference.reference
      )
    // Implementation for whatever you want to do with reference and after success call.
    // console.log(reference);
   
  };

  // you can call this function anything
  const handleClose = () => {
    
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return (
    <>
      <Toaster></Toaster>
      <CustomHeader value="My Basket"></CustomHeader>
      {/* <Header value="Checkout"></Header> */}
      <div className="container text-neutral-600 p-12 mx-auto">
        <div className="text-xl font-bold">CheckOut Info</div>
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col w-full md:w-full">
            <form className="justify-center w-full mx-auto">
              <div className="z-0">
                <div className="mt-4 z-10">
                  <div className="w-full z-10">
                    <label
                      for="busstop"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Nearest Bus Stop
                    </label>
                    <input
                      value={formState.nearest.value}
                      onChange={(e) => {
                        onInputCheckOutChange(
                          "nearest",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      onBlur={(e) => {
                        onCheckOutFocusOut(
                          "nearest",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      name="Last Name"
                      type="text"
                      placeholder="e.g USELU"
                      className="w-full px-4 z-10 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    ></input>
                    {formState.nearest.touched &&
                      formState.nearest.hasError && (
                        <p className="text-red-500 my-3 text-xs italic">
                          {formState.nearest.error}
                        </p>
                      )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full">
                    <label
                      for="busstop"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Phone number
                    </label>
                    <input
                     type="tel"
                      value={formState.phone.value}
                      onChange={(e) => {
                        onInputCheckOutChange(
                          "phone",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      onBlur={(e) => {
                        onCheckOutFocusOut(
                          "phone",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      name="Last Name"
                      
                      placeholder="e.g +2349044884834"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    ></input>
                    {formState.phone.touched && formState.phone.hasError && (
                      <p className="text-red-500 my-3 text-xs italic">
                        {formState.phone.error}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 z-10">
                  <div className="w-full z-10">
                    <label
                      for="busstop"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Delivery Address
                    </label>
                    <input
                      value={formState.delivery.value}
                      onChange={(e) => {
                        onInputCheckOutChange(
                          "delivery",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      onBlur={(e) => {
                        onCheckOutFocusOut(
                          "delivery",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      name="Last Name"
                      type="text"
                      placeholder="e.g 21 edo street"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    ></input>
                    {formState.delivery.touched &&
                      formState.delivery.hasError && (
                        <p className="text-red-500 my-3 text-xs italic">
                          {formState.delivery.error}
                        </p>
                      )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      for="Description"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Description
                    </label>
                    <textarea
                      value={formState.description.value}
                      onChange={(e) => {
                        onInputCheckOutChange(
                          "description",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      onBlur={(e) => {
                        onCheckOutFocusOut(
                          "description",
                          e.target.value,
                          dispatch,
                          formState
                        );
                      }}
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="Description"
                      cols="20"
                      rows="4"
                      placeholder="Note"
                    ></textarea>
                    {formState.description.touched &&
                      formState.description.hasError && (
                        <p className="text-red-500 my-3 text-xs italic">
                          {formState.description.error}
                        </p>
                      )}
                  </div>
                </div>
                {/* <div className="flex items-center mt-4">
                                <label className="flex items-center text-sm group text-heading">
                                    <input type="checkbox"
                                        className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"></input>
                                    <span className="ml-2">Save this information for next time</span></label>
                            </div> */}
                {/* <div className="relative pt-3 xl:pt-6"><label for="note"
                                    className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                                    (Optional)</label><textarea name="note"
                                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    rows="4" placeholder="Notes for delivery"></textarea>
                            </div> */}
                <div className="mt-4">
                  <PaystackConsumer {...componentProps}>
                    {({ initializePayment }) => (
                      <button
                        onClick={() => {
                          let isFormValid = true;

                          for (const name in formState) {
                            const item = formState[name];
                            const { value } = item;
                            const { hasError, error } = validateCheckOutInput(
                              name,
                              value
                            );
                            if (hasError) {
                              isFormValid = false;
                            }
                            if (name) {
                              dispatch({
                                type: "UPDATE_FORM",
                                data: {
                                  name,
                                  value,
                                  hasError,
                                  error,
                                  touched: true,
                                  isFormValid,
                                },
                              });
                            }
                          }
                          if (!isFormValid) {
                            setShowError(true);
                          } else {
                            getVendorNames();
                            initializePayment(handleSuccess, handleClose);
                          }
                        }}
                        type="button"
                        className="w-full px-6 py-2 text-white font-bold bg-green-600 hover:bg-green-700"
                      >
                        Pay
                      </button>
                    )}
                  </PaystackConsumer>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-col w-full ml-0 md:ml-10 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  {menuData.map((e) => {
                    return (
                      <div className="flex space-x-4">
                        <div>
                          <img
                            src={e.menu.image}
                            alt="image"
                            className="w-60"
                          ></img>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{e.menu.title}</h2>
                          <p className="text-sm">{e.specialty}</p>
                          <p className="text-sm">X {e.quantity}</p>
                          <span>Price</span> ₦{e.menu.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS {menuData.length}</h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Subtotal<span className="ml-2">₦{total}.00</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Delivery Fee<span className="ml-2">₦{value.deliveryfee+value.userdeliveryfee}</span>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total<span className="ml-2">₦{total + value.deliveryfee+ value.userdeliveryfee}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Checkout;
