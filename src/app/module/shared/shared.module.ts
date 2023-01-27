import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponent } from './component';
import { ExternalLinkDirective } from './directive';

@NgModule({
  declarations: [ExternalLinkDirective, IconComponent],
  exports: [ExternalLinkDirective, IconComponent],
  imports: [CommonModule],
})
export class SharedModule {}
