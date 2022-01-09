import { Component, OnInit } from '@angular/core';
import { RootStoreState } from '@app/root-store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as selectors from '@app/root-store/apartment-store/apartment.selector';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
})
export class ApartmentListComponent implements OnInit {
  apartmentList$: Observable<any> | undefined;

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit(): void {
    this.apartmentList$ = this.store$.pipe(
      select(selectors.getApartmentList())
    );
  }
}
