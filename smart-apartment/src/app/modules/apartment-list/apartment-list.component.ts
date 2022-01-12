import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { RootStoreState } from '@app/root-store';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';
import { CommonService } from '@app/shared/services/common/common.service';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
})
export class ApartmentListComponent implements OnInit, OnDestroy {
  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();

  apartmentList$: Observable<any> | undefined;
  loader$: Observable<any> | undefined;
  togglePriceFilter: boolean = false;
  toggleBedFilter: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedPrice: number = 0;
  studio: boolean = true;
  oneBed: boolean = true;
  twoBed: boolean = true;
  threeBed: boolean = true;
  showFavorites: boolean = false;
  apartmentRangeList: Array<any> = [];
  favoritesList: Array<any> = [];
  subscription: Subscription = new Subscription();
  screenWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private store$: Store<RootStoreState.State>,
    private commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {
    this.onResize();
  }

  ngOnInit(): void {
    this.loader$ = this.store$.pipe(select(selectors.getApartmentLoader()));

    this.apartmentList$ = this.store$.pipe(
      select(selectors.getApartmentList())
    );

    this.getPriceRange();
    this.getFavorites();
  }

  /**
   * TOGGLE RENTS PRICE BUTTON
   */
  toggleRents() {
    this.toggleBedFilter = false;
    this.togglePriceFilter = !this.togglePriceFilter;
  }

  /**
   * TOGGLE BEDROOMS BUTTON
   */
  toggleBeds() {
    this.togglePriceFilter = false;
    this.toggleBedFilter = !this.toggleBedFilter;
  }

  /**
   * GET PRICE RANGE & MIN AND MAX PRICE
   */
  getPriceRange() {
    this.subscription.add(
      this.store$
        .pipe(select(selectors.getApartmentRange()))
        .subscribe((range: any[]) => {
          if (range?.length) {
            this.apartmentRangeList = [...range];

            let priceList = [...range];
            priceList = range.map((item) => item.price);

            this.minPrice = Math.min(...priceList);
            this.maxPrice = Math.max(...priceList);
            this.cd.markForCheck();
          }
        })
    );
  }

  /**
   * GET FAVORITES
   */
  getFavorites() {
    this.favoritesList = this.commonService.getFavourities();
  }

  /**
   * MAP FAVORITES ITEM BY PROPERTYID
   * @param propertyID PROPERTYID
   * @returns BOOLEAN (WEATHER CURRENT PROPERTYID IS FAVORITE OR NOT)
   */
  getFavoritesByID(propertyID: any) {
    let favorites: boolean = false;

    if (this.favoritesList?.length) {
      this.favoritesList?.forEach((item: any) => {
        if (item.propertyID == propertyID) {
          favorites = true;
        }
      });
    }
    return favorites;
  }

  /**
   * OPEN SIDENAV ( FOR MOBILE VIEW (SCREENWIDTH <= 480))
   */
  openSidenav() {
    this.openSidenavClick.emit('open');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
