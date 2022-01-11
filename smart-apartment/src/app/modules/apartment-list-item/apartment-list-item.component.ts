import { Component, OnDestroy, OnInit } from '@angular/core';
import { apartmentStoreActions, RootStoreState } from '@app/root-store';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-apartment-list-item',
  templateUrl: './apartment-list-item.component.html',
  styleUrls: ['./apartment-list-item.component.scss'],
})
export class ApartmentListItemComponent implements OnInit, OnDestroy {
  apartmentItemList$: Observable<any> | undefined;
  subscription: Subscription = new Subscription();
  activeQuery: any;
  showGallery: boolean = false;
  changeColor: boolean = false;

  constructor(
    private store$: Store<RootStoreState.State>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.activeQuery = { ...params };

        if (params?.propertyId) {
          this.store$.dispatch(
            new apartmentStoreActions.GetApartmentItemRequestAction(
              +params?.propertyId
            )
          );
        }
      })
    );

    this.apartmentItemList$ = this.store$.pipe(
      select(selectors.getApartmentItemList())
    );
  }

  /**
   * TOGGLE GALLERY
   */
  toggleGallery() {
    this.showGallery = !this.showGallery;
  }

  /**
   * PREVIOUS ( GO BACK )
   */
  goBack() {
    this.store$.dispatch(
      new apartmentStoreActions.RemoveApartmentItemRequestAction()
    );

    this.router.navigate(['/smart-apartment']);
  }

  /**
   *
   * @param apartmentItem
   */
  toggleFavourite(apartmentItem: any) {
    this.changeColor = !this.changeColor;
    const item = { ...apartmentItem };
    item.favorite = true;

    const favourites = JSON.stringify(item);
    localStorage.setItem('favourites', favourites);

    // const favoritiesList = localStorage.getItem('favourites');
    // const list = JSON.parse(favoritiesList);

    // if (favoritiesList?.length >= 1) {
    // }

    // this.store$
    //   .pipe(select(selectors.getFavouriteApartmentItemList()))
    //   .subscribe((response: any) => {
    //     console.log(response);
    //     if (response.length >= 1) {
    //       const currentFavourite = [];
    //       currentFavourite.push(item);
    //       const favourites = [...response, ...currentFavourite];
    //       console.log(favourites);

    //       this.store$.dispatch(
    //         new apartmentStoreActions.GetFavouriteApartmentSuccessAction(
    //           favourites
    //         )
    //       );
    //     } else {
    //       const favourite = [];
    //       favourite.push(item);
    //       this.store$.dispatch(
    //         new apartmentStoreActions.GetFavouriteApartmentSuccessAction(
    //           favourite
    //         )
    //       );
    //     }
    //   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
