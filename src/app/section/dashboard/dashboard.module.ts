import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/module/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
