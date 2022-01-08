import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { MainRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, MainRoutingModule],
})
export class LayoutModule {}
