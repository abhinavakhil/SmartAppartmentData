import { Action } from '@ngrx/store';

export enum ActionTypes {
  GET_APARTMENT_REQUEST = '[GET_APARTMENT] Request',
  GET_APARTMENT_SUCCESS = '[GET_APARTMENT] Success',

  GET_APARTMENT_ITEM_REQUEST = '[GET_APARTMENT_ITEM] Request',
  GET_APARTMENT_ITEM_SUCCESS = '[GET_APARTMENT_ITEM] Success',

  REMOVE_APARTMENT_ITEM_SUCCESS = '[REMOVE_APARTMENT_ITEM_SUCCESS] Success',
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

export class RemoveApartmentItemRequestAction implements Action {
  readonly type = ActionTypes.REMOVE_APARTMENT_ITEM_SUCCESS;
}

export type Actions =
  | GetApartmentRequestAction
  | GetApartmentSuccessAction
  | GetApartmentItemRequestAction
  | GetApartmentItemSuccessAction
  | RemoveApartmentItemRequestAction;
