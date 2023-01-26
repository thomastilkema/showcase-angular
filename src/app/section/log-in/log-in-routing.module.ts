import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './page';

const routes: Routes = [
  {
    component: LogInPageComponent,
    path: '',
    title: 'Log in',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogInRoutingModule {}
