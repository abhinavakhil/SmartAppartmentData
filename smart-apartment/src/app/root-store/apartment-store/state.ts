export interface ApartmentState {
  apartment: Array<any[]>;
  apartmentItem: any;
  productId: number;
}

export const initialState: ApartmentState = {
  apartment: [],
  apartmentItem: null,
  productId: 0,
};
