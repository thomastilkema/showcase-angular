import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { omitFirstCharacter, Route } from '@app/core';

const routes: Routes = [
  {
    loadChildren: () =>
      import('@app/section/home').then((module) => module.HomeModule),
    path: omitFirstCharacter(Route.Home),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
