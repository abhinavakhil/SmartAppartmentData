import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApartmentStoreModule } from './apartment-store';

export const metaReducers: MetaReducer<any>[] = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    ApartmentStoreModule,
  ],
})
export class RootStoreModule {}
