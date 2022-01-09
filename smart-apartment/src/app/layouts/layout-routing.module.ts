import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'smart-apartment',
    pathMatch: 'full',
  },
  {
    path: 'smart-apartment',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@app/modules/home/home.module').then((m) => m.HomeModule),
        data: { title: 'Home' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
