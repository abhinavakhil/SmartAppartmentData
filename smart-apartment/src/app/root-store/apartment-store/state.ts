export interface ApartmentState {
  apartment: Array<any[]>;
  apartmentItem: any;
  productId: number;
  apartmentLoader: boolean;
}

export const initialState: ApartmentState = {
  apartment: [],
  apartmentItem: null,
  productId: 0,
  apartmentLoader: false,
};
