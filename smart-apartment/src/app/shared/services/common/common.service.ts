import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  /**
   * Get FAVORITES FROM LOCALSTORAGE
   * @returns FAVORITES
   */
  getFavourities() {
    const favourites: any = localStorage.getItem('favourites');
    const favoritesList = JSON.parse(favourites);
    return favoritesList;
  }

  /**
   * SAVE FAVORITES TO LOCALSTORAGE
   * @param list FAVORITE ITEM
   */
  saveFavoritesToLocalStorage(list: any) {
    let favoriteList = [];
    const favourites: any = localStorage.getItem('favourites');
    favoriteList = JSON.parse(favourites) || [];
    favoriteList.push(list);

    const uniqueFavouriteList = this.removeDuplicate(favoriteList);
    localStorage.setItem('favourites', JSON.stringify(uniqueFavouriteList));
  }

  /**
   * REMOVE DUPLICATE BY FILTERING FAVORITES DATA BASED UPON PROPERTYID
   * @param list
   * @returns
   */
  removeDuplicate(list: any) {
    const favApartments = Array.from(
      new Set(list.map((item: any) => item.propertyID))
    ).map((propertyID) => {
      return list.find((a: any) => a.propertyID === propertyID);
    });

    return favApartments;
  }

  /**
   * GET FAVORITES LIST BY PROPERTYID
   * @param propertyId
   * @returns CURRENT FAVORITES ITEM
   */
  getFavoritesListById(propertyId: any) {
    const favoritesList = this.getFavourities();
    const favorites = favoritesList?.filter(
      (list: any) => list.propertyID == +propertyId
    );
    return favorites;
  }

  /**
   * REMOVE FAVORITES FROM LOCALSTORAGE BASED UPON PROPERTYID
   * @param propertyId
   */
  removeFavoritesItemById(propertyId: any) {
    const favoritesList = this.getFavourities();
    if (favoritesList?.length) {
      const index = favoritesList?.findIndex(
        (item: any) => item.propertyID == propertyId
      );

      if (index > -1) {
        favoritesList.splice(index, 1);
      }

      const newFavorites = [...favoritesList];

      localStorage.setItem('favourites', JSON.stringify(newFavorites));
    }
  }
}
