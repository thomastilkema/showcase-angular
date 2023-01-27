import { PageObject } from '@app/test';
import { IconComponent } from './icon.component';

export class ComponentPageObject extends PageObject<IconComponent> {
  getIconHeight() {
    return this.getIconDimension('height');
  }

  getIconWidth() {
    return this.getIconDimension('width');
  }

  getPathToIcon() {
    return this.findElement('svg use')?.getAttribute('href');
  }

  private getIconDimension(dimension: 'height' | 'width') {
    const svgElement = this.findElement('svg');
    if (!svgElement) {
      return undefined;
    }

    return Number(svgElement.getAttribute(dimension));
  }
}
