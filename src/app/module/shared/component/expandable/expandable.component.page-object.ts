import { PageObject } from '@app/test';
import { IconComponent } from '../icon/icon.component';
import { ExpandableComponent } from './expandable.component';

export class ComponentPageObject extends PageObject<ExpandableComponent> {
  getExpandableContent() {
    return this.getInnerTextByCss('[data-tms-expandable-content]');
  }

  getIconComponentInstance() {
    return this.findComponentInstance(IconComponent);
  }

  getToggleContent() {
    return this.getInnerTextByCss('[data-tms-expandable-toggle]');
  }

  isArrowRotated() {
    return this.findElement('tms-icon')?.classList.contains('rotate-90');
  }

  isExpandableContentHidden() {
    return this.findElement('.overflow-hidden')?.style.height === '0px';
  }

  toggle() {
    this.click(this.findElement('.flex'));
    this.detectChanges();
  }
}
