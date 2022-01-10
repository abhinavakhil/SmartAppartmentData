import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RootStoreState } from '@app/root-store';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
})
export class ApartmentListComponent implements OnInit, OnDestroy {
  apartmentList$: Observable<any> | undefined;
  togglePriceFilter: boolean = false;
  toggleBedFilter: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedPrice: number = 0;
  apartmentRangeList: Array<any> = [];
  subscription: Subscription = new Subscription();

  constructor(
    private store$: Store<RootStoreState.State>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apartmentList$ = this.store$.pipe(
      select(selectors.getApartmentList())
    );

    this.getPriceRange();
  }

  filterRents() {
    this.togglePriceFilter = !this.togglePriceFilter;
  }

  filterBeds() {
    this.toggleBedFilter = !this.toggleBedFilter;
  }

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
