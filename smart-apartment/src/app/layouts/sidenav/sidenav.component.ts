import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  // mobileQuery;
  // private _mobileQueryListener: () => void;

  // sideNavItems: Array<{ name: string; path: string }> = [
  //   { name: 'dashboard', path: '/dashboard' },
  //   { name: 'profile', path: '/profile' },
  //   { name: 'notification', path: '/notification' },
  // ];

  // constructor(private cd: ChangeDetectorRef, private media: MediaMatcher) {
  //   this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  //   this._mobileQueryListener = () => this.cd.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);
  // }

  ngOnInit() {}

  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
