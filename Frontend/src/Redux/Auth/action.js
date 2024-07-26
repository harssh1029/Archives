import * as types from "./actionTypes";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// export const signin = (email, password) => (dispatch) => {
//   dispatch({ type: types.ADD_SIGNUP_REQUEST })
//   const auth = getAuth();
//   return createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       return dispatch({ type: types.ADD_SIGNUP_SUCCESS })
//     })
//     .catch((error) => {
//       dispatch({ type: types.ADD_SIGNUP_FAILURE, payload:error.message })
//     });
// }

export const signin = (email, password, username, phone_no) => (dispatch) => {
  dispatch({ type: types.ADD_SIGNUP_REQUEST });

  // Define the URL of your local server endpoint for signup
  const localSignupUrl = 'http://localhost:3030/user/auth/register'; // Replace with your actual URL

  // Prepare the data to be sent in the POST request
  const postData = {
    email: email,
    password: password,
    name: username,
    phone_no: phone_no
  };

  // Use the Fetch API to send a POST request to your local server
  return fetch(localSignupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if (!response.ok) {
      // If the server response is not ok, throw an error
      throw new Error('Failed to sign up');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // Handle the successful response here
    // Dispatch the success action with any relevant payload
    dispatch({ type: types.ADD_SIGNUP_SUCCESS, payload: data });
  })
  .catch(error => {
    // Handle any errors here
    // Dispatch the failure action with the error message
    dispatch({ type: types.ADD_SIGNUP_FAILURE, payload: error.message });
  });
};

export const login = (email, password) => (dispatch) => {
  dispatch({ type: types.GET_LOGIN_REQUEST });

  // Define the URL of your local server endpoint for login
  const localLoginUrl = 'http://localhost:3030/user/auth/sign_in'; // Replace with your actual URL

  // Prepare the data to be sent in the POST request
  const postData = {
    email: email,
    password: password
  };

  // Use the Fetch API to send a POST request to your local server
  return fetch(localLoginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if (!response.ok) {
      // If the server response is not ok, throw an error
      console.log("not ok")
      throw new Error('Failed to log in');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // Handle the successful response here
    // Dispatch the success action with any relevant payload
    console.log("It's ok")
    console.log("Response data 1:", data);
    dispatch({ type: types.GET_LOGIN_SUCCESS, payload: data });
    return data
  })
  .catch(error => {
    // Handle any errors here
    // Dispatch the failure action with the error message
    console.log("error")
    dispatch({ type: types.GET_LOGIN_FAILURE, payload: error.message });
    return error
  });
};