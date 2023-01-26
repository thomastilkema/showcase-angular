import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DefaultLayoutComponent, MainNavComponent } from './core';

@NgModule({
  declarations: [AppComponent, DefaultLayoutComponent, MainNavComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
