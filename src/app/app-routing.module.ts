import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { omitFirstCharacter, Route } from '@app/core';

const routes: Routes = [
  {
    loadChildren: () =>
      import('@app/section/home').then((module) => module.HomeModule),
    path: omitFirstCharacter(Route.Home),
  },
  {
    loadChildren: () =>
      import('@app/section/log-in').then((module) => module.LogInModule),
    path: omitFirstCharacter(Route.LogIn),
  },
  {
    loadChildren: () =>
      import('@app/section/sign-up').then((module) => module.SignUpModule),
    path: omitFirstCharacter(Route.SignUp),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
