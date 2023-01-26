import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Spectator } from '@ngneat/spectator';

export class PageObject<Component> {
  constructor(protected readonly spectator: Spectator<Component>) {}

  protected findDebugElement(selector: string): DebugElement | null {
    return this.spectator.debugElement.query(By.css(selector));
  }

  protected findDebugElements(selector: string): DebugElement[] {
    return this.spectator.debugElement.queryAll(By.css(selector));
  }

  protected findElement<ElementType = HTMLElement>(
    selector: string
  ): ElementType | undefined {
    const debugElement = this.findDebugElement(selector);
    return debugElement ? debugElement.nativeElement : undefined;
  }

  protected findElements<ElementType = HTMLElement>(
    selector: string
  ): ElementType[] {
    return this.findDebugElements(selector).map(
      (debugElement) => debugElement.nativeElement
    );
  }
}
