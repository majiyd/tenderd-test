import initialState from "../initialState";
import * as actionTypes from "../actions";
import uniqid from 'uniqid'

export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {
    case actionTypes.SEND_NOTIFICATION:{
      const newNotification = {
        id: uniqid('notification-'),
        type: action.payload.type,
        message: action.payload.message,
      }
      return{
        ...state, notifications:[
          ...state.notifications, newNotification
        ],
      }
    }
    case actionTypes.DELETE_NOTIFICATION:{
      let notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
      return{
        ...state, notifications: notifications
      }
    }
    default:
      return state;
  }
}
