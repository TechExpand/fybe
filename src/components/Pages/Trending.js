import logo2 from "../image/1.png";
import logo3 from "../image/2.png";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import logo4 from "../image/3.png";
import {getTrendVendor} from "../Service/Network"
import ContentLoader, { Facebook } from 'react-content-loader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
   

function Trending(){
    const history = useNavigate();
    const [myTrendlist, setTrendList] = useState([]);

    const listTrendHandler = (value)=> {
        setTrendList(value)
    }


    useEffect(() => {
        getTrendVendor(listTrendHandler)
      }, []);

    return (
        <>
        {
     myTrendlist.length === 0 &&  
      <div className=" w-full h-auto flex-col flex justify-center items-center">
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
               myTrendlist.length > 0 &&  <div>
                   <div className="justify-center items-center mt-8">
                       <div className="grid   grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                   {myTrendlist.map((e)=>{
                       return  <Link
                       to={"/menu"}
                     state = {
                       {
                        vendor: {specialty: "trending", trend: true},
                        menu: e,
                       }}  >
                           
                           <div 
                       style={{
                        backgroundImage: `url(${e.image})`,
                    
                      }}
                       className="hover:shadow-2xl bg-no-repeat bg-cover gap-5 flex hover:border-4 transition-all duration-300  w-full h-48 rounded-md border-2  text-neutral-600  border-gray-200 justify-center items-center">
                           {/* <div className=" w-20  z-10">
                             <img src={e.image}></img>
                           </div> */}
                             <div className="w-full mt-24 p-3 text-white rounded-md right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900">
                             <div className=" pt-4 text-xl font-black">{e.title}</div>
                           <a className="text-md tracking-tight font-medium leading-7 font-regular">
                             {e.description.toString().substring(0, 20)}
                           </a>
                           <div className="text-xl font-black">Price: ₦{e.price}.00</div>
                             </div>
                         </div>
                         </Link>
            
                   })}
               </div>
               </div>
                     </div>
               
               }
        </>
    );
}


export default Trending

