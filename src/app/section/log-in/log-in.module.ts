import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModule } from '@app/module/form';
import { LogInFormComponent } from './component';
import { LogInRoutingModule } from './log-in-routing.module';
import { LogInPageComponent } from './page';

@NgModule({
  declarations: [LogInFormComponent, LogInPageComponent],
  imports: [CommonModule, FormModule, LogInRoutingModule],
})
export class LogInModule {}
