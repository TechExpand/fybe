import {Navigate, Outlet} from "react-router-dom"

function PrivateRoute(){
     return localStorage.getItem('token')?<Outlet/>: <Navigate to="/login"/>
     
}


export default PrivateRoute



