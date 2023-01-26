import { PageObject } from '@app/test';
import { AppComponent } from './app.component';

export class ComponentPageObject extends PageObject<AppComponent> {
  getRoutedContent() {
    return this.findElement('router-outlet');
  }
}
