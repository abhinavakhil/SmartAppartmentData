import { createSelector } from '@ngrx/store';
import { ApartmentStoreModule } from './apartment-store.module';

export const selectItems = (state: ApartmentStoreModule) =>
  state.Apartment ? state.Apartment : null;

/**
 * GET APARTMENT LST
 * @returns APARTMENT LIST
 */
export const getApartmentList = () =>
  createSelector(selectItems, (items) => {
    {
      if (items != null && items['apartment']) {
        return items['apartment'];
      }
      return null;
    }
  });

/**
 * GET APARTMENT RECORDS FROM APRTMENT LIST
 * @returns APARTMENT RECORDS
 */
export const getApartmentsData = () =>
  createSelector(selectItems, (items) => {
    {
      if (items != null && items['apartment']) {
        return items['apartment']['records'];
      }
      return null;
    }
  });

/**
 * GET APARTMENT ITEM
 * @returns APARTMENT ITEM
 */
export const getApartmentItemList = () =>
  createSelector(selectItems, (items) => {
    {
      if (items != null && items['apartmentItem']) {
        return items['apartmentItem'];
      }
      return null;
    }
  });

/**
 * GET PRICE RANGE FROM APARTMENT LIST -> RECORD INTO A SINGLE ARRAY
 * @returns ARRAY OF PRICE, BEDROOMS, PROPERTYID
 */
export const getApartmentRange = () =>
  createSelector(selectItems, (items) => {
    {
      if (
        items != null &&
        items['apartment'] &&
        items['apartment']['records']
      ) {
        const apartmentRecords = items['apartment']['records'];

        let rangeList: any = [];
        rangeList = apartmentRecords.map((record: any) => {
          const propertyID = record.propertyID;
          let updatedData: any[] = [];
          record.floorplans.forEach((plan: any) => {
            const plans = { ...plan, propertyID };
            updatedData.push(plans);
          });

          return updatedData;
        });

        return rangeList.flat(1);
      } else {
        return null;
      }
    }
  });
