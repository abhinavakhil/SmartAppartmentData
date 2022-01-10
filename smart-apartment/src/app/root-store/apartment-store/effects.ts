import { Injectable } from '@angular/core';
import { ApartmentService } from '@app/shared/services';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootStoreState } from '..';
import * as apartmentActions from './actions';

@Injectable()
export class ApartmentStoreEffects {
  constructor(
    private apartmentService: ApartmentService,
    private action$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

  apartmentObject = this.store$.select('Apartment');

  @Effect() getApartmentEffect$: Observable<any> = this.action$.pipe(
    ofType<apartmentActions.GetApartmentRequestAction>(
      apartmentActions.ActionTypes.GET_APARTMENT_REQUEST
    ),
    switchMap((action: any) => {
      return this.apartmentService.property().pipe(
        map((data) => {
          return new apartmentActions.GetApartmentSuccessAction(data);
        }),
        catchError((error) => {
          return error;
        })
      );
    })
  );

  @Effect() getApartmentItemEffect$: Observable<any> = this.action$.pipe(
    ofType<apartmentActions.GetApartmentItemRequestAction>(
      apartmentActions.ActionTypes.GET_APARTMENT_ITEM_REQUEST
    ),
    switchMap((action: any) => {
      return this.apartmentService.propertyById(action.productId).pipe(
        map((data) => {
          return new apartmentActions.GetApartmentItemSuccessAction(data);
        }),
        catchError((error) => {
          return error;
        })
      );
    })
  );

  // @Effect() getFavouriteApartmentItemEffect$: Observable<any> =
  //   this.action$.pipe(
  //     ofType<apartmentActions.GetFavouriteApartmentRequestAction>(
  //       apartmentActions.ActionTypes.GET_FAVOURITE_APARTMENT_REQUEST
  //     ),
  //     switchMap((action: any) => {
  //       // return this.apartmentService.propertyById(action.productId).pipe(
  //       //   map((data) => {
  //       // return new apartmentActions.GetFavouriteApartmentSuccessAction(action.);
  //       // }),
  //       console.log(action);
  //       // catchError((error) => {
  //       //   return error;
  //       // })
  //       // );
  //     })
  //   );
}
