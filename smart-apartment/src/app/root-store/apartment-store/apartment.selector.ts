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

export const getApartmentsData = () =>
  createSelector(selectItems, (items) => {
    {
      if (items != null && items['apartment']) {
        return items['apartment']['records'];
      }
      return null;
    }
  });

export const getApartmentItemList = () =>
  createSelector(selectItems, (items) => {
    {
      if (items != null && items['apartmentItem']) {
        return items['apartmentItem'];
      }
      return null;
    }
  });
