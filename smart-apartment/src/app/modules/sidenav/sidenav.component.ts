import { MediaMatcher } from '@angular/cdk/layout';
import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apartmentStoreActions, RootStoreState } from '@app/root-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  subscription: Subscription = new Subscription();
  activeQuery: any;

  constructor(
    private cd: ChangeDetectorRef,
    private media: MediaMatcher,
    private activatedRoute: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
    //sidenav
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.cd.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.activeQuery = { ...params };
        console.log(params);

        // if (params?.propertyId) {
        //   alert(params.propertyId);
        //   this.store$.dispatch(
        //     new apartmentStoreActions.GetApartmentItemRequestAction(
        //       +params?.propertyId
        //     )
        //   );
        // }
      })
    );
  }

  ngOnDestroy(): void {
    //sidenav
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
