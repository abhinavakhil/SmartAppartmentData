import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Services } from '@app/shared/services';
import { SharedModule } from '@app/shared/shared.module';
// NGRX
import { RootStoreModule } from './root-store/root-store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [...Services],
  bootstrap: [AppComponent],
})
export class AppModule {}
