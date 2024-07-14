import axios from "axios";
import * as types from "./actionTypes";
const backendUrl = 'http://localhost:3000'; // Adjust if your backend is running on a different port

const getProduct = (payload = 'products',limit='') => (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_REQUEST });
    return axios
        .get(`${backendUrl}/${payload}?_limit=${limit}`)
        .then((r) => {
            // console.log(r.data)
            return dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: r.data });
        })
        .catch((e) => {
            dispatch({ type: types.GET_PRODUCTS_FAILURE});
        })
}

const getSingleProduct = (id) => (dispatch) => {
    console.log('Dispatching getSingleProduct with ID:', id); 
    dispatch({ type: types.GET_SINGLE_REQUEST });
    return axios
        .get(`${backendUrl}/products/${id}`)
        .then((r) => {
            dispatch({ type: types.GET_SINGLE_SUCCESS, payload: r.data });
        })
        .catch((e) => {
            dispatch({ type: types.GET_SINGLE_FAILURE, error: e });
        });
};


const postCart = (payload) => (dispatch) => {
    dispatch({ type: types.POST_CART_REQUEST });
    return axios
        .post(`${backendUrl}/cart`, payload)
        .then((r) => {
            return dispatch({ type: types.POST_CART_SUCCESS });
        })
        .catch((e) => {
            dispatch({ type: types.POST_CART_FAILURE });
        })
}

const getCart = (payload) => (dispatch) => {
    dispatch({ type: types.GET_CART_REQUEST });
    return axios
        .get(`${backendUrl}/cart`)
        .then((r) => {
            return dispatch({ type: types.GET_CART_SUCCESS, payload: r.data });
        })
        .catch((e) => {
            dispatch({ type: types.GET_CART_FAILURE});
        })
}

const deleteCart = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_CART_REQUEST });

    return axios
        .delete(`${backendUrl}/cart/${id}`)
        .then((r) => {
            return dispatch({ type: types.DELETE_CART_SUCCESS });
        })
        .catch((e) => {
            dispatch({ type: types.DELETE_CART_FAILURE });
        })
}
const patchcart = ({qnty,id}) => (dispatch) => {
    dispatch({ type: types.PATCH_CART_REQUEST });

    return axios
        .patch(`${backendUrl}/cart/${id}`,{
            quantity : qnty
        })
        .then((r) => {
            return dispatch({ type: types.PATCH_CART_SUCCESS}
            );
        })
        .catch((e) => {
            dispatch({ type: types.PATCH_CART_FAILURE });
        })
}
export { getProduct, getCart, postCart, deleteCart,getSingleProduct,patchcart }

// import axios from "axios";
// import * as types from "./actionTypes";

// const backendUrl = 'http://localhost:3000'; // Adjust if your backend is running on a different port

// const getProduct = (payload = 'products',limit='') => (dispatch) => {
//     dispatch({ type: types.GET_PRODUCTS_REQUEST });
//     return axios
//         .get(`${backendUrl}/${payload}?_limit=${limit}`)
//         .then((r) => {
//             return dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: r.data });
//         })
//         .catch((e) => {
//             dispatch({ type: types.GET_PRODUCTS_FAILURE });
//         });
// };

// const getSingleProduct = (payload) => (dispatch) => {
//     dispatch({ type: types.GET_SINGLE_REQUEST });
//     return axios
//         .get(`${backendUrl}/products/${payload}`)
//         .then((r) => {
//             return dispatch({ type: types.GET_SINGLE_SUCCESS, payload: r.data });
//         })
//         .catch((e) => {
//             dispatch({ type: types.GET_SINGLE_FAILURE });
//         });
// };

// const postCart = (payload) => (dispatch) => {
//     dispatch({ type: types.POST_CART_REQUEST });
//     return axios
//         .post(`${backendUrl}/cart`, payload)
//         .then((r) => {
//             return dispatch({ type: types.POST_CART_SUCCESS });
//         })
//         .catch((e) => {
//             dispatch({ type: types.POST_CART_FAILURE });
//         });
// };

// const getCart = (payload) => (dispatch) => {
//     dispatch({ type: types.GET_CART_REQUEST });
//     return axios
//         .get(`${backendUrl}/cart`)
//         .then((r) => {
//             return dispatch({ type: types.GET_CART_SUCCESS, payload: r.data });
//         })
//         .catch((e) => {
//             dispatch({ type: types.GET_CART_FAILURE });
//         });
// };

// const deleteCart = (id) => (dispatch) => {
//     dispatch({ type: types.DELETE_CART_REQUEST });
//     return axios
//         .delete(`${backendUrl}/cart/${id}`)
//         .then((r) => {
//             return dispatch({ type: types.DELETE_CART_SUCCESS });
//         })
//         .catch((e) => {
//             dispatch({ type: types.DELETE_CART_FAILURE });
//         });
// };

// const patchcart = ({ qnty, id }) => (dispatch) => {
//     dispatch({ type: types.PATCH_CART_REQUEST });
//     return axios
//         .patch(`${backendUrl}/cart/${id}`, {
//             quantity: qnty
//         })
//         .then((r) => {
//             return dispatch({ type: types.PATCH_CART_SUCCESS });
//         })
//         .catch((e) => {
//             dispatch({ type: types.PATCH_CART_FAILURE });
//         });
// };

// export { getProduct, getCart, postCart, deleteCart, getSingleProduct, patchcart };
