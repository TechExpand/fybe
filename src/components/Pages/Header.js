
import logo9 from "../image/9.png";
import logo18 from "../image/18.png";
import logo from "../image/logo.png";
import { useState } from "react";
import logo6 from "../image/5.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faTimes} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../Utils/CartContext";
import Drawer from "./Drawer";



function Header(props){


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
<div className="w-full  h-96 bg-neutral-800 pb-40">
        <div className="flex justify-center">
          <div>
            <div className="flex container items-center">
              <div className="flex h-10 py-16 items-center">
                <div className="pr-24 lg:pr-24  md:mr-72 z-10 w-60 ">
                <Link
 to={"/"}
 className=" cursor-pointer z-10"
>
                  <img src={logo}></img>
                  </Link>
                </div>

                <div className="items-center text-white gap-5 px-12 hidden lg:flex lg:gap-6">
                    <Link to={"/"} className="hover:text-green-600 cursor-pointer z-10">
                      {" "}
                      <div>Home</div>
                    </Link>
                    <Link to={"/"} className="hover:text-green-600 cursor-pointer z-10">
                      {" "}
                      <div>Orders</div>
                    </Link>
                    <a href="tel:090909008080" className="hover:text-green-600 cursor-pointer z-10">
                      {" "}
                      <div
                        
                      >
                        Contact
                      </div>
                    </a>
                  </div>

                <div className="flex items-center gap-8 lg:gap-8">
             
<Link
 to={"/cart"}
 className=" cursor-pointer z-10"
>
    <button className=" cursor-pointer py-4 px-1 relative border-2 border-transparent text-gray-50 rounded-full hover:text-gray-50 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
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
 className=" cursor-pointer z-10">
                    <div className="hidden text-white   rounded-md h-6  items-center justify-center w-10 bg-green-600 p-1 lg:w-32 lg:h-14 lg:flex">
                      <div>Login</div>
                    </div>
                    </Link>:
                     <Link
                     to={"/login"}
                   onClick={() => {
                     localStorage.clear()
                   }}>
                    <div className="hidden text-white   rounded-md h-6  items-center justify-center w-10 bg-green-600 p-1 lg:w-32 lg:h-14 lg:flex">
                      <div>Logout</div>
                    </div>
                    </Link>
                    }
                  </div>
                </div>

                <Drawer custom={true} value={shown} handleShow={handleShow}></Drawer>
  
  <FontAwesomeIcon
  onClick={(()=>{
    handleShow()
  })}
    className=" ml-10 flex cursor-pointer z text-2xl text-green-700 text-md lg:hidden"
    icon={ shown?faTimes:faBars}
  />
              </div>
            </div>
          </div>
        </div>

        <div className="container flex justify-center items-center gap-2  my-10 w-full">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="z-10 text-5xl md:text-5xl font-black text-white">
               {props.value?props.value:"Delicious Dinner.."}  
              </div>
             
            </div>
          </div>
        </div>

        <div className=" absolute top-0 bottom-3 h-10 z-0">
          <img src={logo18}></img>
        </div>

        <div className="absolute  overflow-hidden top-42 right-0 z-0">
          <img src={logo9}></img>
        </div>

        <div className="absolute z-0  w-16 bottom-4 right-0">
          <img src={logo6}></img>
        </div>
    </>
    )
}


export default Header