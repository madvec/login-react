import axios from "axios";

export const SIGN_IN = {
  START: "SIGNIN_START",
  COMPLETED: "SIGNIN_SUCCESS",
  FAILURE: "SIGNIN_FAILURE",
};
let API_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIraa0C0u-L1lnpfoYjo8Sf9rBt4o8P1A";

export const authSuccess = (idToken, userId) => {
  return {
    type: SIGN_IN.COMPLETED,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {    
    return {
        type: SIGN_IN.FAILURE,
        error: error
    }
}

export const sign_in = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN.START,
    });
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(API_URL, authData)
      .then((response) => {
        console.log(response)
        localStorage.setItem('jwtToken', response.data.idToken)
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
