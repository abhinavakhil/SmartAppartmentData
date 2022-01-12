import { Component, OnInit } from '@angular/core';
import { RootStoreState } from '@app/root-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit(): void {}
}
