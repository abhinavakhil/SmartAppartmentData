import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApartmentStoreEffects } from './effects';
import { ApartmentReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('Apartment', ApartmentReducer),
    EffectsModule.forFeature([ApartmentStoreEffects]),
  ],
  providers: [ApartmentStoreEffects],
})
export class ApartmentStoreModule {
  Apartment: any;
}
