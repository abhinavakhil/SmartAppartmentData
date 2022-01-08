import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
  },
];

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [MapComponent],
})
export class MapModule {}
