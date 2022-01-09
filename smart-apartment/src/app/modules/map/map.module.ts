import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, SharedModule, FlexLayoutModule],
  exports: [MapComponent],
})
export class MapModule {}
