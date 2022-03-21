import {Navigate, Outlet} from "react-router-dom"

function CheckLogin(){
     return localStorage.getItem('token')? <Navigate to="/"/>:<Outlet/>
     
}


export default CheckLogin



