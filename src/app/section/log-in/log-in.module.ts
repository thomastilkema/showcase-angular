import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogInPageComponent } from './page/log-in-page/log-in-page.component';
import { LogInRoutingModule } from './log-in-routing.module';

@NgModule({
  declarations: [LogInPageComponent],
  imports: [CommonModule, LogInRoutingModule],
})
export class LogInModule {}
