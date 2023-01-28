import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/module/shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DefaultLayoutComponent, MainNavComponent } from './core';

@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent, MainNavComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
