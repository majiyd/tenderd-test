import store from "../redux/store";

export const API_URL = "http://localhost:5001/tenderd-ac353/us-central1/app";

export const headers = {
  headers: {
    "x-access-token": store.getState().user.token,
  },
};

export const getErrorMessage = (error) => error.response.data.message;
