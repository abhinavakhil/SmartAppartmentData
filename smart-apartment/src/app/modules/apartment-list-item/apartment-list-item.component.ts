import { Component, OnInit } from '@angular/core';
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
export class ApartmentListItemComponent implements OnInit {
  apartmentItemList$: Observable<any> | undefined;
  subscription: Subscription = new Subscription();
  activeQuery: any;
  showGallery: boolean = false;

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

  toggleGallery() {
    this.showGallery = !this.showGallery;
  }
}
