import React, { useState , useEffect} from "react";
import CustomHeader from "../Pages/CustomHeader";
import Footer from "../Pages/Footer";
import Store from "../Pages/Store";



function AllVendors() {



  return (
    <>
      <CustomHeader></CustomHeader>
     <Store></Store>
      <Footer></Footer>
    </>
  );
}

export default AllVendors;
