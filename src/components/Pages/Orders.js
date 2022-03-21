import React, { useState , useEffect} from "react";
import CustomHeader from "../Pages/CustomHeader";
import Footer from "../Pages/Footer";
import Store from "../Pages/Store";
import {getOrder} from "../Service/Network"
import ContentLoader, { Facebook } from 'react-content-loader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';



function Orders() {
    const history = useNavigate();
    const [myOrderlist, setOrderList] = useState([]);

    const listOrderHandler = (value)=> {
        setOrderList(value)
    }


    useEffect(() => {
        getOrder(listOrderHandler)
      }, []);


  return (
    <>
      <CustomHeader></CustomHeader>
      <>
        {
     myOrderlist.length === 0 &&  
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
               myOrderlist.length > 0 &&  <div className="z-0 w-full h-auto flex-col flex justify-center items-center">
            <div className="z-0 max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
              {myOrderlist.map((e, index) =>{
                return  <div key={e._id}
                    className="relative shadow-xl h-64 w-full flex items-end justify-start text-left bg-cover bg-center transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-green-200 duration-300"
                    style={{
                      backgroundImage: `url(${e.menu.image})`,
                    }}
                  >
                  <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                    <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-start items-start"></div>
                    <main className="py-5  mr-40 pl-5 z-10">
                     
                    <div  className=" w-72 flex flex-col items-start justify-start">




                        
                      <div className="w-full mt-2 text-3xl md:text-4xl text-white font-black">
                      {e.menu.title}
                      </div>
                      <a className="text-md tracking-tight font-medium leading-7 font-regular text-white  no-underline">
                      <div
                    className="text-lg text-white "
                
                  > {e.menu.vendortitle}</div>
                      </a>
                      <div className="w-full mt-2 text-md text-white font-black">
                      Price: ₦{e.menu.price}
                      </div>
                      <div className="flex items-center">
                          <FontAwesomeIcon
                          className="text-lg text-white font-bold"
                          icon={faCheckCircle} />
                          <div className="text-lg text-white font-bold px-2"> Success</div>
                      </div>
                      </div> 
                    </main>
                  </div> 
            })}
              </div>
            </div>
          </div>}
        </>
      <Footer></Footer>
    </>
  );
}

export default Orders;
