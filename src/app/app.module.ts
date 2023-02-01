import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AppComponent,
  DefaultLayoutComponent,
  IsLoggedInGuard,
  IsLoggedOutGuard,
  MainNavComponent,
} from '@app/core';
import { SharedModule } from '@app/module/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { effects, reducers } from './store';

@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent, MainNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    SharedModule,
  ],
  providers: [IsLoggedInGuard, IsLoggedOutGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
