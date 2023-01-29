import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormModule } from '@app/module/form/form.module';
import { SharedModule } from '@app/module/shared';
import { SignUpFormComponent } from './component';
import { SignUpPageComponent } from './page';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpFormComponent, SignUpPageComponent],
  imports: [CommonModule, FormModule, SharedModule, SignUpRoutingModule],
})
export class SignUpModule {}
