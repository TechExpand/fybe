import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import logo3 from "../image/2.png";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { getCategory, getCategoryMenu } from "../Service/Network";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ContentLoader, { Facebook } from "react-content-loader";

import CustomHeader from "./CustomHeader";
import { CartContext } from "../Utils/CartContext";

function VendorMenu() {
  const location = useLocation();
  const vendorData = location.state;

  const [myCategory, setCategory] = useState([]);
  const [myMenu, setMenu] = useState([]);

  const categoryHandler = (value) => {
    setCategory(value);
  };

  function determineClosed(start, end){
    var value = false;
     var date = new Date();
     var hour = date.getHours()

     var example = "1:00 AM" ;

     var parts = example.match(/(\d+):(\d+) (AM|PM)/);

     if (parts) {
      var hours = parseInt(parts[1]),
          minutes = parseInt(parts[2]),
          tt = parts[3];
      if (tt === 'PM' && hours < 12) hours += 12;

     return date.setHours(hours, minutes, 0, 0);
  }

     


    //  var formatedEndTime = df.parse(end.toString().toUpperCase()).hour;

    //  var formatedStartTime = df.parse(start.toString().toUpperCase()).hour;

    // if(hour > formatedEndTime || hour <   formatedStartTime){
    //   value = true;
    //   print(hour);
    //   print(formatedStartTime);
    // }else{
    //   value = false;
    // }
    // return value;
  }

  const menuHandler = (value) => {
    setMenu(value);
  };

  useEffect(() => {
    getCategory(categoryHandler, menuHandler, vendorData._id);
  }, []);

  const contextValue = useContext(CartContext);
  // useEffect(()=> {
  //   getCategoryMenu(menuHandler,vendorData._id, "61dc4bd046fd75f3d5ac6903" )
  // }, [])

  const [indexValue, setindexValue] = useState(0);

  return (
    <>
      <CustomHeader value={vendorData.name} />
      <div className="gap-5 flex  z-10 w-full flex-wrap h-48 rounded-md bg-gray-100 text-neutral-600  border-gray-200 justify-start items-center">
        <div className="ml-5 mr-1  shadow-lg  border-white  border-2 rounded-full w-24 lg:w-40 flex-shrink-0'">
          <img
            className="rounded-full object-cover"
            src={vendorData.image}
          ></img>
        </div>
        <div>
          <div className=" pt-4 text-sm md:text-xl font-bold">
            {vendorData.name.toString().charAt(0).toUpperCase() +
              vendorData.name.slice(1)}
          </div>
          <a className="text-md font-medium  text-neutral-600 tracking-tight  leading-7 font-regular no-underline">
            <FontAwesomeIcon
              className="text-sm font-medium text-neutral-600 "
              icon={faClock}
            />{" "}
            {vendorData.deliverytime} mins
          </a>
          <div className="text-sm md:text-xl font-normal">
            Delivery fee: ₦{contextValue.deliveryfee}.00
          </div>
          <div className="text-xl md:text-xl font-black text-green-900">
           
          </div>
        </div>
      </div>

      {myCategory.length === 0 ? (
        <div className=" w-full h-auto px-2 py-10 justify-center items-center">
          <ContentLoader />
        </div>
      ) : (
        <div className="pt-6 bg-white">
          <div className="container ">
            <div className="container flex flex-col md:flex-row justify-between items-center">
              <div>
                <div className="mb-3 text-3xl md:text-3xl lg:text-5xl font-black text-neutral-600">
                  Menu <span className="text-green-600">Items</span>
                </div>
              </div>

              <div className=" flex flex-col font-bold justify-center items-center text-lg ">
                <div className="mb-3 text-neutral-600">Categories</div>
                <div className="flex flex-wrap flex-row justify-center items-center gap-4 md:gap-6">
                  {myCategory.map((e, index) => {
                    return (
                      <div
                        onClick={() => {
                          setindexValue(index);
                          menuHandler([]);
                          getCategoryMenu(menuHandler, e._id, vendorData._id);
                        }}
                        key={index}
                      >
                        <div
                          className={`cursor-pointer p-1 font-bold text-sm ${
                            indexValue === index && "bg-green-600"
                          } rounded-md  ${
                            indexValue === index
                              ? "text-white"
                              : "text-neutral-600"
                          }`}
                        >
                          {e.title.toString().toUpperCase().charAt(0) +
                            e.title.toString().slice(1)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {myMenu.length === 0 ? (
              <div className=" w-full h-auto px-2 py-10 justify-center items-center">
                <ContentLoader />
              </div>
            ) : (
              <div className="justify-center items-center mt-8">
                <div className="grid   grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {myMenu.map((e) => {
                    return (
                      <Link
                        to={"/menu"}
                        state={{
                          vendor: vendorData,
                          menu: e,
                        }}
                      >
                        <div
                          style={{
                            backgroundImage: `url(${e.image})`,
                          }}
                          className="hover:shadow-2xl bg-no-repeat bg-cover gap-5 flex hover:border-4 transition-all duration-300  w-full h-48 rounded-md border-2  text-neutral-600  border-gray-200 justify-center items-center"
                        >
                          {/* <div className=" w-20  z-10">
                             <img src={e.image}></img>
                           </div> */}
                          <div className="w-full mt-24 p-3 text-white rounded-md right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900">
                            <div className=" pt-4 text-xl font-black">
                              {e.title.toString().toUpperCase().charAt(0) +
                                e.title.toString().slice(1)}
                            </div>
                            <a className="text-md tracking-tight font-medium leading-7 font-regular">
                              {e.description.toString().substring(0, 30)}
                            </a>
                            <div className="text-xl font-black">
                              Price: ₦{e.price}.00
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default VendorMenu;
