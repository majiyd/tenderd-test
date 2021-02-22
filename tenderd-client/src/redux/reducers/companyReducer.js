import initialState from "../initialState";
import * as actionTypes from "../actions";

export default function companyReducer(state = initialState.company, action) {
  switch (action.type) {
    case actionTypes.GET_COMPANIES: {
      return {
        ...state,
        error: {},
        loading: true,
      };
    }

    case actionTypes.GET_COMPANIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        companies: action.payload,
      };
    }

    case actionTypes.GET_COMPANIES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case actionTypes.LOGOUT: {
      return initialState.company;
    }
    default:
      return state;
  }
}
