import { fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createHostFactory } from '@ngneat/spectator';
import { MockComponent, MockModule } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';
import { ExpandableComponent } from './expandable.component';
import { ComponentPageObject } from './expandable.component.page-object';

describe('The <tms-expandable> component', () => {
  const createSpectator = createHostFactory({
    component: ExpandableComponent,
    declarations: [MockComponent(IconComponent)],
    imports: [MockModule(BrowserAnimationsModule)],
  });

  const setup = () => {
    const spectator = createSpectator(
      `
        <tms-expandable>
          <div data-tms-expandable-toggle>Mocked toggle</div>
          <div data-tms-expandable-content>Mocked content</div>
        </tms-expandable>
      `
    );

    return new ComponentPageObject(spectator);
  };

  it('should display the provided toggle content', () => {
    const pageObject = setup();
    expect(pageObject.getToggleContent()).toBe('Mocked toggle');
  });

  it('should contain the provided expandable content', () => {
    const pageObject = setup();
    expect(pageObject.getExpandableContent()).toBe('Mocked content');
  });

  it('should hide the expandable content by default', () => {
    const pageObject = setup();
    expect(pageObject.isExpandableContentHidden()).toBe(true);
  });

  it('should display an arrow icon next to the toggle content', () => {
    const pageObject = setup();
    const iconComponentInstance = pageObject.getIconComponentInstance();
    expect(iconComponentInstance?.height).toBe(16);
    expect(iconComponentInstance?.name).toBe('chevron-right');
    expect(iconComponentInstance?.width).toBe(16);
    expect(pageObject.isArrowRotated()).toBe(false);
  });

  describe('when clicking the toggler', () => {
    it('should display the expandable content when it is hidden and hide it when it is visible', fakeAsync(() => {
      const pageObject = setup();

      expect(pageObject.isExpandableContentHidden()).toBe(true);
      pageObject.toggle();
      expect(pageObject.isExpandableContentHidden()).toBe(false);
      pageObject.toggle();
      pageObject.tick(0);
      expect(pageObject.isExpandableContentHidden()).toBe(true);
    }));

    it('should rotate the arrow icon when the expandable content becomes visible', () => {
      const pageObject = setup();

      expect(pageObject.isArrowRotated()).toBe(false);
      pageObject.toggle();
      expect(pageObject.isArrowRotated()).toBe(true);
    });
  });
});
