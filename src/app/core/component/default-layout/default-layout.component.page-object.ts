import { PageObject } from '@app/test';
import { DefaultLayoutComponent } from './default-layout.component';

export class ComponentPageObject extends PageObject<DefaultLayoutComponent> {
  getMainNavigation() {
    return this.findElement('header tms-main-nav');
  }

  getRoutedContent() {
    return this.findElement('main#main-content router-outlet');
  }
}
