
import React, { useContext } from 'react';
import { CartContext } from '../Utils/CartContext';




const mainurl = "https://fybe.herokuapp.com/api"



export const checkPaymentReference = (value, toast, navigate, reference) =>{
  let status;

  fetch(`${mainurl}/order/${reference}`, {
method: 'post',
headers: {
  'Content-Type':  'application/json'
},
body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    toast(res.message)
  }else{
    navigate('/', {reset: true});
    window.location.reload();
  } 
  }); 
} 






export const reset = (value, setLoad, toast, email) =>{
  let status;

  fetch(`${mainurl}/reset?email=${email}`, {
method: 'post',
headers: {
  'Content-Type':  'application/json'
},
body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    setLoad(false)
    toast(res.message)
  }else{
    setLoad(false)
    toast('New Password has been sent to your Registered Email')
  } 
  });
} 






export const register = (value, setLoad, toast, navigate) =>{
    let status;

    fetch(`${mainurl}/signup`, {
  method: 'post',
  headers: {
    'Content-Type':  'application/json'
  },
  body: JSON.stringify(value)
}).then((res) => {
    status = res.status
    return res.json();
  })
  .then(function (res){ 
    if(status >= 300){
      setLoad(false)
      toast(res.message)
    }else{
      setLoad(false)
      navigate('/');
      localStorage.setItem('token', res.token);
    localStorage.setItem('id', res.id);
    localStorage.setItem('email', res.email)
    localStorage.setItem('name', res.fullname)
    } 
    });
} 



export const login = (value, setLoad, toast, navigate) =>{
  let status;

  fetch(`${mainurl}/login`, {
method: 'post',
headers: {
  'Content-Type':  'application/json'
},
body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    setLoad(false)
    toast(res.message)
  }else{
    setLoad(false)
    navigate('/');
    console.log(res)
    localStorage.setItem('token', res.token);
    localStorage.setItem('id', res.id);
    localStorage.setItem('email', res.email)
    localStorage.setItem('name', res.fullname)
  } 
  });
} 



export const getOrder = (setList) =>{
  let status;

  fetch(`${mainurl}/order`, {
method: 'get',
headers: {
  'Content-Type':  'application/json',
  'Authorization': `${localStorage.getItem('token')}`,
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
     setList([])
  }else{
    console.log('meeeeeeeee')
    console.log(res)
    setList(res)
  } 
  });
} 


export const getTrendVendor = (setList) =>{
  let status;

  fetch(`${mainurl}/trend`, {
method: 'get',
headers: {
  'Content-Type':  'application/json'
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
     setList([])
  }else{
    console.log('meeeeeeeee')
    console.log(res)
    setList(res)
  } 
  });
} 


export const getUserDeliveryAmount = (setAmount) =>{
  let status;

  fetch(`${mainurl}/profile`, {
method: 'get',
headers: {
  'Content-Type':  'application/json'
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
    setAmount(0)
  }else{
    console.log('meeeeeeeee')
    console.log(res)
    setAmount(res.deliveryfee)
  } 
  });
} 




export const getAmount = (setAmount) =>{
  let status;

  fetch(`${mainurl}/getamount`, {
method: 'get',
headers: {
  'Content-Type':  'application/json'
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
    setAmount(0)
  }else{
    console.log('meeeeeeeee')
    console.log(res)
    setAmount(res.message)
  } 
  });
} 


export const getVendor = (setList) =>{
  let status;

  fetch(`${mainurl}/vendor`, {
method: 'get',
headers: {
  'Content-Type':  'application/json'
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
     setList([])
  }else{
    console.log(res)
    setList(res)
  } 
  });
} 

export const getCart = (setList, token, setTotal) =>{
  let status;

  fetch(`${mainurl}/cart`, {
method: 'get',
headers: {
  'Content-Type':  'application/json',
  'Authorization': `${token}`,
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
     setList([])
  }else{
    console.log(res)
    setList(res)
   let  cartTotal =0.0 ;
    for(var i = 0; i < res.length; i++)
    {
      cartTotal += parseFloat(res[i].menu.price * res[i].quantity);
    }
    setTotal(cartTotal)
  } 
  });
} 



export const deleteCart = (setList, id, callCart, setUserDeliveryfeeHandler) =>{
  let status;
 let  userId = localStorage.getItem('id');
  fetch(`${mainurl}/cart/${id}/${userId}`, {
method: 'delete',
headers: {
  'Content-Type':  'application/json',
  // 'Authorization': `${token}`,
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
     setList([])
  }else{
    let token = localStorage.getItem('token')
    console.log(res)
    getCart(setList, token)
    callCart()
    setUserDeliveryfeeHandler()
  } 
  });
} 

export const getCategory = (setCategory,menuHandler, id) =>{
  let status;

  fetch(`${mainurl}/category/${id}`, {
method: 'get',
headers: {
  'Content-Type':  'application/json'
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
    setCategory([])
  }else{
    console.log(res)
    setCategory(res)
    getCategoryMenu(menuHandler,res[0]._id,id)
  } 
  });
} 




export const getCategoryMenu =async (setMenu, catid, vendorid) =>{
  let status;

  fetch(`${mainurl}/vendormenu/${vendorid}/${catid}`, {
method: 'get',
headers: {
  'Content-Type':  'application/json'
},
// body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
    setMenu([])
  }else{
    console.log(res)
    setMenu(res)
  } 
  });
} 


export const addCart = (value, setLoad, toast, setUserDeliveryfeeHandler) =>{
  let status;

  fetch(`${mainurl}/cart`, {
method: 'post',
headers: {
  'Content-Type':  'application/json'
},
body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    console.log(res)
    setLoad(false)
    toast('Failed to add to Basket')
  }else{
    console.log(res)
    setUserDeliveryfeeHandler()
    setLoad(false)
    toast("Menu Added to Basket")
  } 
  });
} 



export const checkUserVendor = (value, setLoad, toast, dialog,addToCart,setUserDeliveryfeeHandler) =>{
  let status;
  let shown = localStorage.getItem('shown')

  fetch(`${mainurl}/vendor-verify`, {
method: 'post',
headers: {
  'Content-Type':  'application/json'
},
body: JSON.stringify(value)
}).then((res) => {
  status = res.status
  return res.json();
})
.then(function (res){ 
  if(status >= 300){
    
    setLoad(false)
    toast('Failed to add to Basket')
  }else{
   
    setLoad(false)
    if (!shown) {
    if (res.message === true) {
      // noteDialog();
      dialog(true)
      
    } else if (res.message === false) {
      addToCart()
      setUserDeliveryfeeHandler()
    }
  } else {
    addToCart()
    setUserDeliveryfeeHandler()
  }

    // toast(res.message.toString())
  } 
  });
} 