import initialState from "../initialState";
import * as actionTypes from "../actions";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN: {
      return {
        ...state,
        error: {},
        loading: true,
      };
    }

    case actionTypes.SIGN_IN_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }

    case actionTypes.SIGN_IN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.LOGOUT: {
      return initialState.user;
    }

    default:
      return state;
  }
}
