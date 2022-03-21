import logo from "../image/logo.png";
import { useState } from "react";
import logo4 from "../image/3.png";
import logo5 from "../image/4.png";
import logo6 from "../image/5.png";
import logo7 from "../image/call.png";
import BreakFast from "../image/b.png";
import Launch from "../image/l.png";
import toast, { Toaster } from "react-hot-toast";
import Dinner from "../image/d.png";
import logo8 from "../image/bike.png";
import phone from "../image/phone.png";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Store from "../Pages/Store"
import { CartContext } from "../Utils/CartContext";
import { Link } from "react-router-dom";
import Trending from "./Trending";
import Drawer from "./Drawer";


function scrolldiv() {
  var elem = document.getElementById("ele");
  elem.scrollIntoView();
}

function scrolldiv2() {
  var elem = document.getElementById("contact");
  elem.scrollIntoView();
}



function HomePage(){
  const notify = (message) => toast(message);
  function logoTime() {
var today = new Date();
    var hour = today.getHours()
    if (hour < 12) {
      return BreakFast;
    }
    if (hour < 17) {
      return Launch;
    }
    return Dinner;
  }



  function foodTime() {
    var today = new Date();
        var hour = today.getHours()
        if (hour < 12) {
          return 'BREAKFAST?';
        }
        if (hour < 17) {
          return 'LUNCH?';
        }
        return 'DINNER?';
      }


      const [shown, setShown] = useState(false);

    const handleShow = ()=> {
      if(shown){
        setShown(false)
      }else{
        setShown(true)
      }
      
    }



    return (
        <>
        <Toaster></Toaster>
        {/* header section */}
        <div className="w-full  h-auto shadow-md bg-gray-100 pb-32">
          <div className="flex justify-center">
            <div>
              <div className="flex container items-center">
                <div className="flex h-10 py-16 items-center">
                  <div className="pr-24 lg:pr-24 md:mr-72  z-10 w-60 ">
                    <img src={logo}></img>
                  </div>
  
                  <div className="items-center gap-5 px-12 hidden lg:flex lg:gap-6">
                  <Link
 to={"/"}
 className="hover:text-green-600 cursor-pointer z-10"
> <div>Home</div>
</Link>
                    <div className="hover:text-green-600" onClick={(()=>{
                      scrolldiv()
                    })}>About</div>
                    <div className="hover:text-green-600" onClick={(()=>{
                      scrolldiv2()
                    })}>Contact</div>
                  </div>
  
                  <div className="hover:text-green-600 flex items-center gap-8 lg:gap-8">
                  <Link
 to={"/cart"}
 className=" cursor-pointer z-10"
>
    <button className=" cursor-pointer py-4 px-1 relative border-2 border-transparent text-black rounded-full hover:text-black focus:outline-none focus:text-black transition duration-150 ease-in-out" aria-label="Cart">
  <svg className="cursor-pointer h-8 w-8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>
  <span className=" cursor-pointer absolute inset-0 object-right-top -mr-6">
    <CartContext.Consumer>
                  {(value)=> {
                    return <div className=" cursor-pointer inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">{value.myCart.length}</div>
                  }}
    </CartContext.Consumer>
  </span>
</button>
</Link>
    {!localStorage.getItem('token')?<Link
 to={"/login"}
 className=" cursor-pointer z-10"
>
                    <div className="hidden text-white   rounded-md h-6  items-center justify-center w-10 bg-green-600 p-1 lg:w-32 lg:h-14 lg:flex">
                      <div>Login</div>
                    </div>
                    </Link>:<Link
                      to={"/login"}
                    onClick={() => {
                      localStorage.clear()
                    }}
                    ><div className="hidden text-white   rounded-md h-6  items-center justify-center w-10 bg-green-600 p-1 lg:w-32 lg:h-14 lg:flex">
                      <div>Logout</div>
                    </div></Link>}
                  </div>
                <Drawer value={shown} handleShow={handleShow}></Drawer>
  
                  <FontAwesomeIcon
                  onClick={(()=>{
                    handleShow()
                  })}
                    className="cursor-pointer z-10  ml-10 flex  text-2xl text-green-700 text-md lg:hidden"
                    icon={ shown?faTimes:faBars}
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div className="container flex-col-reverse flex md:flex-row  items-center gap-2  my-10 w-full">
            <div className="flex items-end  ml-0  md:ml-20  w-4/5">
              <div className=" gap-5 flex flex-col">
           
              <div className="text-lg italic text-neutral-600">
                  Eat Well- Vibe Well...
                </div>
               
               
                <div className="text-4xl md:text-6xl font-black text-neutral-600">
                  WHAT DO YOU WANT FOR<span className="text-green-600"> {foodTime()}</span>{" "}
                </div>
               
              </div>
            </div>
            
            <div className="flex justify-center items-center">
              <img src={logoTime()}></img>
            </div>
            
          </div>
  
          <div className=" absolute top-0 z-0">
            <img src={logo5}></img>
          </div>
  
          <div className="absolute z-0">
            <img src={logo4}></img>
          </div>
  
          <div className="absolute z-0 w-16 bottom-4 right-0">
            <img src={logo6}></img>
          </div>
        </div>
        {/* header end */}
  
        {/*section 2*/}
        <div className="text-xl md:text-3xl lg:text-5xl flex justify-between font-bold md:font-black container mt-10 text-neutral-600">
       
             <div className="font-black">Vendors</div>
           
             <Link
             to={"/vendors"}  >
            
             <div className=" cursor-pointer" >See All</div>
             
             </Link>
          </div>
                <Store/>
               
        {/*section 2 end*/}
  
        {/*section 3*/}
      
        <div className="container" >
          <div className="text-2xl md:text-3xl lg:text-5xl font-black text-neutral-600">
            Trending <span className="text-green-600">Menus</span>
          </div>
  
          <Trending></Trending>
        </div>
       
        {/*section 3 end*/}
  
        {/*section 4*/}
        <div className=" bg-neutral-200 shadow-md mt-14" id="ele">
          <div className="flex justify-center items-center text-center ">
            <div>
              <div className="text-lg md:text-xl font-bold mt-20 italic  text-green-700">
                Why Choose US?
              </div>
              {/* <div className="text-4xl   w-96 font-black text-white">
                Best Quality{" "}
                <span className="text-red-600">Item Ingredients</span>
              </div> */}
            </div>
          </div>
  
          <div className=" text-center flex w-full  flex-col container mt-14 justify-center items-center md:flex-row">
            <div>
          
              <div>
                <div className="text-xl md:text-2xl  font-bold text-neutral-600">
                Focus on Customer Satisfaction
                </div>
               {/* <div>Shrimp, Squid, PineappleFYBE is a Food Logistics Company aimed at bridging the gap between Restaurants and Customers.</div> */}
              </div>
             
  
              <div>
             
                <div className="text-xl md:text-2xl my-5 md:mt-28  mt-10 font-bold text-neutral-600">
                Efficient Delivery
                </div>
                
                {/* <div>Shrimp, Squid, Pineapple</div>
                <div className="text-lg   font-black text-blue-900">
                  Price: $5.00
                </div> */}
              </div>
            </div>
  
           
            <div className="flex mb-0 md:mb-5 sm:w-full w-full justify-center items-center">
              <img className="sm:w-full w-full" src={logo8}></img>
            </div>
           
  
  
            <div>
              <div>
            
                <div className="text-xl md:text-2xl my-5  font-bold text-neutral-600">
                 Bringing the kitchen to your doorstep
                </div>
              
                {/* <div>Shrimp, Squid, Pineapple</div> */}
                {/* <div className="text-lg    font-black text-blue-900">
                  Price: $5.00
                </div> */}
              </div>
  
              <div>
             
                <div className="text-xl md:text-2xl mb-5 md:mt-28  mt-10  font-bold text-neutral-600">
                   Fast and Reliable
                </div>
               
                {/* <div>Shrimp, Squid, Pineapple</div>
                <div className="text-lg   font-black text-blue-900">
                  Price: $5.00
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/*section 4 end*/}
  
  




 {/*section 6 */}
 <div className= "mt-14  mb-14">
          <div className="container flex flex-col-reverse md:flex-row justify-center  items-center gap-2  my-10 w-full ">
            <div className="flex items-center justify-center ml-0 md:ml-20 w-full md:w-2/4">
              <div className=" gap-5 flex flex-col justify-center items-center">
              
                <div className="text-2xl md:text-3xl lg:text-5xl font-black  text-center justify-center items-center  text-neutral-600">
                Easily Make an Order<span className="text-center text-green-600"> Via Our App</span>{" "}
                </div>
          
                <div className="flex justify-center">
    <div>
      <a href="https://apps.apple.com/app/id1606839783">
        <div className="flex mt-3 w-48 h-14 bg-transparent text-black border border-black rounded-xl items-center justify-center">
            <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30" >
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
            </div>
            <div>
                <div className="text-xs">Download on the</div>
                <div className="text-2xl font-semibold font-sans -mt-1">App Store</div>
            </div>
        </div>
      </a>

        


        <a href="https://play.google.com/store/apps/details?id=com.fybe.fybe">
        <div className="flex mt-3 w-48 h-14 bg-black text-white rounded-lg items-center justify-center">
            <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"/>
                    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"/>
                    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"/>
                    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"/>
                </svg>
            </div>
            <div>
             
                <div className="text-xs">GET IT ON</div>
                <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
      
            </div>
        </div>
        </a>
    </div>
</div>
              </div>
            </div>
           
            <div className="flex justify-center  items-center">
              <img  className=" w-6/12" src={phone}></img>
            </div>

          </div>
        </div>
        {/*section 6 end*/}
  
        {/*section 6 */}
        <div className= "mt-14 shadow-md bg-gray-100 mb-14 pb-6 pt-6" id="contact">
          <div className="container flex flex-col-reverse md:flex-row justify-center  items-center gap-2  my-10 w-full ">
            <div className="flex items-center justify-center ml-0 md:ml-20 w-full md:w-2/4">
              <div className=" gap-5 flex flex-col justify-center items-center">
             
                <div className="text-2xl md:text-3xl lg:text-5xl font-black  text-center justify-center items-center  text-neutral-600">
                Delivery at the<span className="text-center text-green-600"> Right Time & Place</span>{" "}
                </div>
               
                <div>
                  <div className="flex text-white  text-lg items-center gap-4">
                
                    <div className=" mr-2 text-lg">
                      <div className="  text-gray-700 text-sm">Delivery Order</div>
                      <div className="  text-green-600 font-bold text-sm md:text-2xl"><a href="tel:+2348148092423">+2348148092423</a></div>
                    </div>
                 
                    <div className="font-semibold  text-sm md:text-xl  rounded-md  items-center justify-center  bg-black p-1 lg:flex">
                      <a href="tel:+2348148092423">Order Now</a>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center w-7/12 lg:w-7/12 items-center">
           
              <img className="w-7/12 lg:w-7/12" src={logo7}></img>
           
            </div>
         
          </div>
        </div>
        {/*section 6 end*/}
  
  
  
        
 
     <Footer/>
      </>
  
    );
}



export default HomePage 