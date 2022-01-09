import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@app/layouts/layout.module').then((m) => m.LayoutModule),
  },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('@app/modules/home/home.module').then((m) => m.HomeModule),
  // },
  // { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
