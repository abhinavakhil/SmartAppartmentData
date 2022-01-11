import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { Pipes } from './pipes';
import { FilterBedroomsPipe } from './pipes/filter-bedrooms.pipe';
import { FilterBedroomItemPipe } from './pipes/filter-bedroom-item.pipe';
import { FilterPriceItemPipe } from './pipes/filter-price-item.pipe';

const Modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  CommonModule,
];

@NgModule({
  declarations: [Pipes, FilterBedroomsPipe, FilterBedroomItemPipe, FilterPriceItemPipe],
  imports: [...Modules, RouterModule],
  exports: [...Modules, Pipes],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
