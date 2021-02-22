import axios from "axios";
import * as actionTypes from ".";
import { API_URL, getErrorMessage } from "../../config";

export const signin = (data) => (dispatch) => {
  dispatch({ type: actionTypes.SIGN_IN });
  axios
    .post(`${API_URL}/auth/signin`, data)
    .then((res) => {
      dispatch({
        type: actionTypes.SIGN_IN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      window.alert(getErrorMessage(error));
      dispatch({
        type: actionTypes.SIGN_IN_FAILURE,
        payload: error,
      });
    });
};

export const signup = (data) => (dispatch) => {
  dispatch({ type: actionTypes.SIGN_IN });
  axios
    .post(`${API_URL}/auth/signup`, data)
    .then((res) => {
      dispatch({
        type: actionTypes.SIGN_IN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      window.alert(getErrorMessage(error));
      dispatch({
        type: actionTypes.SIGN_IN_FAILURE,
        payload: error,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
};
