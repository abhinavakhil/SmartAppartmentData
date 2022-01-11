import { Actions, ActionTypes } from './actions';
import { initialState, ApartmentState } from './state';

export function ApartmentReducer(
  state = initialState,
  action: Actions
): ApartmentState {
  switch (action.type) {
    case ActionTypes.GET_APARTMENT_REQUEST:
      return {
        ...state,
      };
    case ActionTypes.GET_APARTMENT_SUCCESS:
      return {
        ...state,
        apartment: action.payload,
      };
    case ActionTypes.GET_APARTMENT_ITEM_REQUEST:
      return {
        ...state,
        productId: action.productId,
      };
    case ActionTypes.GET_APARTMENT_ITEM_SUCCESS:
      return {
        ...state,
        apartmentItem: action.payload,
      };
    case ActionTypes.REMOVE_APARTMENT_ITEM_SUCCESS:
      return {
        ...state,
        apartmentItem: null,
        productId: -1,
      };
    case ActionTypes.GET_FAVOURITE_APARTMENT_REQUEST:
      return {
        ...state,
      };
    case ActionTypes.GET_FAVOURITE_APARTMENT_SUCCESS:
      return {
        ...state,
        favourite: action.payload,
      };
    default: {
      return state;
    }
  }
}
