import axios from "axios"
import { toast } from "react-toastify"
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FAIL_REQUEST,
  GET_PRODUCT_LIST,
  GET_PRODUCT_OBJ,
  MAKE_REQUEST,
  UPDATE_PRODUCT,
} from "./ActionType";

let productID = null;
export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};
export const getProductList = (data) => {
  return {
    type: GET_PRODUCT_LIST,
    payload: data,
  };
};
export const deleteProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};
export const addProduct = () => {
  return {
    type: ADD_PRODUCT,
  };
};
export const updateProduct = () => {
  return {
    type: UPDATE_PRODUCT,
  };
};
export const getProductObj = (data) => {
  return {
    type: GET_PRODUCT_OBJ,
    payload: data,
  };
};

export const FetchProductList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .get("http://localhost:8000/product")
      .then((res) => {
        const productlist = res.data;
        productID = String(productlist.length + 1);
        dispatch(getProductList(productlist));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};

export const Removeproduct = (code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .delete("http://localhost:8000/product/" + code)
      .then((res) => {
        dispatch(deleteProduct());
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};

export const FunctionAddProduct = (data) => {
  data["id"] = productID;
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .post("http://localhost:8000/product", data)
      .then((res) => {
        dispatch(addProduct());
        toast.success("Product Added successfully.");
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};

export const FunctionUpdateProduct = (data, code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .put("http://localhost:8000/product/" + code, data)
      .then((res) => {
        dispatch(updateProduct());
        toast.success("Product Updated successfully.");
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};
export const FetchProductObj = (code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .get("http://localhost:8000/product/" + code)
      .then((res) => {
        const productlist = res.data;
        dispatch(getProductObj(productlist));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};
