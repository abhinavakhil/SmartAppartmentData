import { Action } from '@ngrx/store';

export enum ActionTypes {
  GET_APARTMENT_REQUEST = '[GET_APARTMENT] Request',
  GET_APARTMENT_SUCCESS = '[GET_APARTMENT] Success',

  GET_APARTMENT_ITEM_REQUEST = '[GET_APARTMENT_ITEM] Request',
  GET_APARTMENT_ITEM_SUCCESS = '[GET_APARTMENT_ITEM] Success',

  GET_FAVOURITE_APARTMENT_REQUEST = '[GET_FAVOURITE_APARTMENT] Request',
  GET_FAVOURITE_APARTMENT_SUCCESS = '[GET_FAVOURITE_APARTMENT] Success',
}

export class GetApartmentRequestAction implements Action {
  readonly type = ActionTypes.GET_APARTMENT_REQUEST;
}

export class GetApartmentSuccessAction implements Action {
  readonly type = ActionTypes.GET_APARTMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetApartmentItemRequestAction implements Action {
  readonly type = ActionTypes.GET_APARTMENT_ITEM_REQUEST;
  constructor(public productId: number) {}
}

export class GetApartmentItemSuccessAction implements Action {
  readonly type = ActionTypes.GET_APARTMENT_ITEM_SUCCESS;
  constructor(public payload: any) {}
}

export class GetFavouriteApartmentRequestAction implements Action {
  readonly type = ActionTypes.GET_FAVOURITE_APARTMENT_REQUEST;
}

export class GetFavouriteApartmentSuccessAction implements Action {
  readonly type = ActionTypes.GET_FAVOURITE_APARTMENT_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions =
  | GetApartmentRequestAction
  | GetApartmentSuccessAction
  | GetApartmentItemRequestAction
  | GetApartmentItemSuccessAction
  | GetFavouriteApartmentRequestAction
  | GetFavouriteApartmentSuccessAction;
