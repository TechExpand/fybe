


export const initialCheckOutState = {
    nearest: { value: "", touched: false, hasError: true, error: "" },
    phone: { value: "", touched: false, hasError: true, error: "" },
    delivery: { value: "", touched: false, hasError: true, error: "" },
    description: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  }


  

  export const reducerCheckOut = (state, action) => {
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







  export  const validateCheckOutInput = (name, value) => {
        let hasError = false,
          error = ""
        switch (name) {
          case "nearest":
            if (value.trim() === "") {
              hasError = true
              error = "Nanearest bus stop cannot be empty"
            } else {
              hasError = false
              error = ""
            }
            break
          case "phone":
            if (value.trim() === "") {
              hasError = true
              error = "phone cannot be empty"
            } else {
              hasError = false
              error = ""
            }
            break
          case "delivery":
            if (value.trim() === "") {
              hasError = true
              error = "Delivery Address cannot be empty"
            } else {
              hasError = false
              error = ""
            }
            break
            case "description":
                if (value.trim() === "") {
                  hasError = true
                  error = "Description cannot be empty"
                }  else {
                  hasError = false
                  error = ""
                }
                break
          default:
            break
        }
        return { hasError, error }
      }



 export const onInputCheckOutChange = (name, value, dispatch, formState) => {
    const { hasError, error } = validateCheckOutInput(name, value)
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


  export const onCheckOutFocusOut = (name, value, dispatch, formState) => {
    const { hasError, error } = validateCheckOutInput(name, value)
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