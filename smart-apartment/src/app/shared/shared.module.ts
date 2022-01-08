import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

const Modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  CommonModule,
];

@NgModule({
  declarations: [],
  imports: [...Modules, RouterModule],
  exports: [...Modules],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
