import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/module/shared';
import {
  FormErrorsComponent,
  FormComponent,
  InputErrorsSummaryComponent,
  InputErrorsComponent,
  InputComponent,
  LabelComponent,
  SubmitButtonComponent,
  SubmitErrorComponent,
} from './component/';
import { InputRowDirective } from './directive/input-row/input-row.directive';
import { SubmitRowDirective } from './directive/submit-row/submit-row.directive';

@NgModule({
  declarations: [
    FormComponent,
    FormErrorsComponent,
    InputComponent,
    InputErrorsComponent,
    InputErrorsSummaryComponent,
    InputRowDirective,
    LabelComponent,
    SubmitButtonComponent,
    SubmitErrorComponent,
    SubmitRowDirective,
  ],
  exports: [
    FormComponent,
    InputComponent,
    InputRowDirective,
    SubmitButtonComponent,
    SubmitErrorComponent,
    SubmitRowDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class FormModule {}
