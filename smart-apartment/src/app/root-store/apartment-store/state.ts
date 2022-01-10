export interface ApartmentState {
  apartment: Array<any[]>;
  apartmentItem: any;
  productId: number;
  favourite: Array<any[]>;
}

export const initialState: ApartmentState = {
  apartment: [],
  apartmentItem: null,
  productId: 0,
  favourite: [],
};
