import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ApartmentListComponent } from '../apartment-list/apartment-list.component';
import { ApartmentListItemComponent } from '../apartment-list-item/apartment-list-item.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { GalleryComponent } from '../gallery/gallery.component';
import { PlansComponent } from '../tabs/plans/plans.component';
import { OverviewComponent } from '../tabs/overview/overview.component';
import { PlanDialogComponent } from '../dialogs/plan-dialog/plan-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    SidenavComponent,
    PlansComponent,
    OverviewComponent,
    PlanDialogComponent,
    ApartmentListComponent,
    ApartmentListItemComponent,
  ],
  imports: [
    CommonModule,
    MapModule,
    SharedModule,
    RouterModule.forChild(routes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgImageFullscreenViewModule,
  ],
  entryComponents: [PlanDialogComponent],
})
export class HomeModule {}
