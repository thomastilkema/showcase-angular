import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExternalLinkDirective } from './directive';

@NgModule({
  declarations: [ExternalLinkDirective],
  exports: [ExternalLinkDirective],
  imports: [CommonModule],
})
export class SharedModule {}
