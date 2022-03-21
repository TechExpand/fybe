import logo2 from "../image/1.png";
import logo3 from "../image/2.png";
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import logo4 from "../image/3.png";
import {getVendor} from "../Service/Network"
import ContentLoader, { Facebook } from 'react-content-loader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from "../Utils/CartContext";
   

function Store(){

  const contextValue = useContext(CartContext);

    const history = useNavigate();
    const [mylist, setList] = useState([]);

    const listHandler = (value)=> {
        setList(value)
    }


    useEffect(() => {
        getVendor(listHandler)
      }, []);

    return (
        <>
        {
     mylist.length === 0 &&  
      <div className="z-0 w-full h-auto flex-col flex justify-center items-center">
          <div className=" max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
            <ContentLoader />
            <div className="w-96">
            </div>
            </div>
          </div>
        </div>
        }


           {
               mylist.length > 0 &&  <div className=" z-0 w-full h-auto flex-col flex justify-center items-center">
            <div className=" max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
              {mylist.map((e, index) =>{
                return  <div key={index}
                    className="relative shadow-xl h-64 w-full flex items-end justify-start text-left bg-cover bg-center transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 duration-300"
                    style={{
                      backgroundImage: `url(${e.image})`,
                    }}
                  >
                    <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                    <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-start items-start"></div>
                    <main className="py-5  mr-40 pl-5 z-10">
                     
                    <div  className=" w-72 flex flex-col items-start justify-start whitespace-nowrap overflow-hidden text-ellipsis">
                    <Link
                     to={"/vendor"}
                     state = {e}  
                     >
                     <a className="cursor-pointer  text-xs rounded-md bg-green-600 font-black text-white px-4 py-2 uppercase hover:bg-black hover:text-white transition ease-in-out duration-500 no-underline">
                        Order
                      </a>
                     </Link>
                     



                      <div className="w-full mt-2 text-lg md:text-xl text-white font-black whitespace-nowrap overflow-hidden text-ellipsis">
                      {e.name}
                      </div>
                      <a className="text-md tracking-tight font-medium leading-7 font-regular text-white  no-underline">
                      <FontAwesomeIcon
                    className="text-sm text-white "
                    icon={faClock}
                  /> {e.deliverytime} mins
                      </a>
                      <div className="w-full mt-2 text-md text-white font-black">
                      Delivery fee: ₦{contextValue.deliveryfee}
                      </div>
                    </div>
                    </main>
                  </div> 
            })}
              </div>
            </div>
          </div>}
        </>
    );
}


export default Store

