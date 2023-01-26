import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignUpPageComponent } from './page/sign-up-page/sign-up-page.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [CommonModule, SignUpRoutingModule],
})
export class SignUpModule {}
