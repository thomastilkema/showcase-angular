import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent, IconComponent } from './component';
import { ExternalLinkDirective } from './directive';

@NgModule({
  declarations: [AlertComponent, ExternalLinkDirective, IconComponent],
  exports: [AlertComponent, ExternalLinkDirective, IconComponent],
  imports: [CommonModule],
})
export class SharedModule {}
