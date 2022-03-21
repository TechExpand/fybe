
 
 
 export const initialState = {
    name: { value: "", touched: false, hasError: true, error: "" },
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    confirm: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  }


  export const initialLoginStateForget = {
    email: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  }



  export const initialLoginState = {
    email: { value: "", touched: false, hasError: true, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  }

  export const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FORM':
        const { name, value, hasError, error, touched, isFormValid } = action.data
        return {
          ...state,
          // update the state of the particular field,
          // by retaining the state of other fields
          [name]: { ...state[name], value, hasError, error, touched },
          isFormValid,
        }
      default:
        return state
    }
}







  export  const validateInput = (name, value) => {
        let hasError = false,
          error = ""
        switch (name) {
          case "name":
            if (value.trim() === "") {
              hasError = true
              error = "Name cannot be empty"
            } else if (!/^[a-zA-Z ]+$/.test(value)) {
              hasError = true
              error = "Invalid Name. Avoid Special characters"
            } else {
              hasError = false
              error = ""
            }
            break
          case "email":
            if (value.trim() === "") {
              hasError = true
              error = "Email cannot be empty"
            } else if (
              !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
                value
              )
            ) {
              hasError = true
              error = "Invalid Email"
            } else {
              hasError = false
              error = ""
            }
            break
          case "password":
            if (value.trim() === "") {
              hasError = true
              error = "Password cannot be empty"
            } else if (value.trim().length < 4) {
              hasError = true
              error = "Password must have at least 4 characters"
            } else {
              hasError = false
              error = ""
            }
            break
            case "confirm":
                if (value.trim() === "") {
                  hasError = true
                  error = "Password cannot be empty"
                } else if (value.trim().length < 4) {
                  hasError = true
                  error = "Password must have at least 4 characters"
                } else {
                  hasError = false
                  error = ""
                }
                break
          default:
            break
        }
        return { hasError, error }
      }



 export const onInputChange = (name, value, dispatch, formState) => {
    const { hasError, error } = validateInput(name, value)
    let isFormValid = true
  
    for (const key in formState) {
      const item = formState[key]
      // Check if the current field has error
      if (key === name && hasError) {
        isFormValid = false
        break
      } else if (key !== name && item.hasError) {
        // Check if any other field has error
        isFormValid = false
        break
      }
    }
  
    dispatch({
      type: 'UPDATE_FORM',
      data: { name, value, hasError, error, touched: false, isFormValid },
    })
  }


  export const onFocusOut = (name, value, dispatch, formState) => {
    const { hasError, error } = validateInput(name, value)
    let isFormValid = true
    for (const key in formState) {
      const item = formState[key]
      if (key === name && hasError) {
        isFormValid = false
        break
      } else if (key !== name && item.hasError) {
        isFormValid = false
        break
      }
    }
  
    dispatch({
      type: 'UPDATE_FORM',
      data: { name, value, hasError, error, touched: true, isFormValid },
    })
  }




  