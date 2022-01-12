import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { PlansComponent } from './common/plans/plans.component';
import { OverviewComponent } from './common/overview/overview.component';
import { PlanDialogComponent } from './dialogs/plan-dialog/plan-dialog.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentListItemComponent } from './components/apartment-list-item/apartment-list-item.component';
import { MapModule } from './map/map.module';

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
