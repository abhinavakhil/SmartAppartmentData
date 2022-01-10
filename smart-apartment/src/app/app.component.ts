import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { apartmentStoreActions, RootStoreState } from './root-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'smart-apartment';

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.store$.dispatch(new apartmentStoreActions.GetApartmentRequestAction());
  }
}
