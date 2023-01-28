import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent, IconComponent } from './component';
import { ButtonDirective, ExternalLinkDirective } from './directive';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonDirective,
    ExternalLinkDirective,
    IconComponent,
  ],
  exports: [
    AlertComponent,
    ButtonDirective,
    ExternalLinkDirective,
    IconComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
