import axios from "axios";
import * as actionTypes from ".";
import { API_URL, getErrorMessage, headers } from "../../config";

export const getAllCompanies = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_COMPANIES });
  axios
    .get(`${API_URL}/companies`, headers)
    .then((res) => {
      dispatch({
        type: actionTypes.GET_COMPANIES_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      window.alert(getErrorMessage(error));
      dispatch({
        type: actionTypes.GET_COMPANIES_FAILURE,
        payload: error,
      });
    });
};
