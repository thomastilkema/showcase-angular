import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AlertComponent,
  IconComponent,
  PendingComponent,
  SpinnerComponent,
} from './component';
import { ButtonDirective, ExternalLinkDirective } from './directive';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonDirective,
    ExternalLinkDirective,
    IconComponent,
    PendingComponent,
    SpinnerComponent,
  ],
  exports: [
    AlertComponent,
    ButtonDirective,
    ExternalLinkDirective,
    IconComponent,
    PendingComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
