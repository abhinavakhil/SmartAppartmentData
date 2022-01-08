import { createSelector } from '@ngrx/store';
import { ApartmentStoreModule } from './apartment-store.module';

export const selectItems = (state: ApartmentStoreModule) =>
  state.Apartment ? state.Apartment : null;

export const getApartmentList = () =>
  createSelector(selectItems, (items) => {
    {
      if (items != null && items['apartment']) {
        return items['apartment'];
      }
      return null;
    }
  });
