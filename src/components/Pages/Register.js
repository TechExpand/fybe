import { useReducer, useState } from "react";
import logo from "../image/logo.png";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {
    reducer, 
    onInputChange,
    onFocusOut,
    validateInput,
    initialState} from '../Utils/formUtils'
import {register} from '../Service/Network'


const notify = (message) => toast(message);

function Register() {

    const history = useNavigate();
    const [showError, setShowError] = useState(false)
    const [formState, dispatch] = useReducer(reducer, initialState)
    const [load, setLoad] = useState(false);
    

 const formSubmitHandler = e => {
    e.preventDefault() //prevents the form from submitting

    let isFormValid = true

    for (const name in formState) {
      const item = formState[name]
      const { value } = item
      const { hasError, error } = validateInput(name, value)
      if (hasError) {
        isFormValid = false
      }
      if (name) {
        dispatch({
          type: 'UPDATE_FORM',
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        })
      }
    }
    if (!isFormValid) {
      setShowError(true)
    } else {
        setLoad(true)
        register({
            email: formState.email.value,
            password: formState.password.value,
            fullname: formState.name.value,
        },
        setLoad,
        notify,
        history,
        )}

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false)
    }, 5000)
  }




  return (
    <>
     <Toaster />
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="w-60   pt-60">
          <img src={logo}></img>
        </div>
        <div className="text-sm italic text-neutral-600">
                  Eat Well- Vibe Well...
                </div>
        <div className="w-full  max-w-sm md:max-w-xl">
        <h1 className="title">Sign Up</h1>
      {showError && !formState.isFormValid && (
        <div className="form_error">Please fill all the fields correctly</div>
      )}
          <form onSubmit={formSubmitHandler}  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   md:pt-10 md:pb-20 md:mb-4">
            <div className="w-full mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Full Name
              </label>
              <input
                className=" shadow-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="username"
                type="text"
                onChange={e => {
                    onInputChange("name", e.target.value, dispatch, formState)
                  }}
                onBlur={e => {
                    onFocusOut("name", e.target.value, dispatch, formState)
                  }}
                value={formState.name.value}
                placeholder="full name"
              ></input>
              {formState.name.touched && formState.name.hasError && (
            <p className="text-red-500 my-3 text-xs italic">{formState.name.error}</p>
          )}
            </div>
            <div className="w-full mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Email
              </label>
              <input
                className=" shadow-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="email"
                value={formState.email.value}
                onChange={e => {
                    onInputChange("email", e.target.value, dispatch, formState)
                  }}
                onBlur={e => {
                    onFocusOut("email", e.target.value, dispatch, formState)
                  }}
                placeholder="example@gmail.com"
              ></input>
               {formState.email.touched && formState.email.hasError && (
            <p className="text-red-500 my-3 text-xs italic">{formState.email.error}</p>
          )}
            </div>

            <div className="w-full mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Password
              </label>
              <input
                className=" shadow-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type="password"
                value={formState.password.value}
                onChange={e => {
                    onInputChange("password", e.target.value, dispatch, formState)
                  }}
                onBlur={e => {
                    onFocusOut("password", e.target.value, dispatch, formState)
                  }}
                placeholder="******************"
              ></input>
               {formState.password.touched && formState.password.hasError && (
            <p className="text-red-500 my-3 text-xs italic">{formState.password.error}</p>
          )}
            </div>

            <div className="w-full mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Confirm Password
              </label>
              <input
                className=" shadow-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="confirmpassword"
                type="password"
                onChange={e => {
                    onInputChange("confirm", e.target.value, dispatch, formState)
                  }}
                onBlur={e => {
                    onFocusOut("confirm", e.target.value, dispatch, formState)
                  }}
                value={formState.confirm.value}
                placeholder="******************"
              ></input>
              {formState.confirm.touched && formState.confirm.hasError && (
            <p className="text-red-500 my-3 text-xs italic">{formState.confirm.error}</p>
          )}
            </div>
            <div className="flex items-center justify-between">
            <button
                className={`bg-green-700 hover:bg-green-800 text-white font-bold ${load?"py-1.5 px-2":"py-2.5 px-4"} rounded focus:outline-none focus:shadow-outline`}
                type="submit"
              >
               <div className="flex justify-center items-center">

               <div class="flex items-center pr-1 justify-center ">
    <div class={`w-6 h-6 border-b-2 border-white rounded-full animate-spin ${load?"inline-block":"hidden"}`}></div>
</div>
                <div>Sign Up</div>
               </div>
              </button>
             <Link to={"/login"}>
              <a
                className="inline-block align-baseline font-bold text-sm text-green-700 hover:text-green-800"
                href="#"
              >
                Have An Account?
              </a>
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 FYBE. All rights reserved.
          </p>
        </div>
      </div>
     
    </>
  );
}

export default Register;
