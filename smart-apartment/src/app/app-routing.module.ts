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
  //     import('@app/modules/map/map.module').then((m) => m.MapModule),
  // },
  // { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
