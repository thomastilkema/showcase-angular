import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AlertComponent,
  ExpandableComponent,
  IconComponent,
  PendingComponent,
  SpinnerComponent,
} from './component';
import { ButtonDirective, ExternalLinkDirective } from './directive';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonDirective,
    ExpandableComponent,
    ExternalLinkDirective,
    IconComponent,
    PendingComponent,
    SpinnerComponent,
  ],
  exports: [
    AlertComponent,
    ButtonDirective,
    ExpandableComponent,
    ExternalLinkDirective,
    IconComponent,
    PendingComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
