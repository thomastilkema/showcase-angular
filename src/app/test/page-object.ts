import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Spectator } from '@ngneat/spectator';

export class PageObject<Component> {
  constructor(protected readonly spectator: Spectator<Component>) {}

  get componentInstance() {
    return this.spectator.component;
  }

  detectChanges() {
    this.spectator.detectChanges();
  }

  detectComponentChanges() {
    this.spectator.detectComponentChanges();
  }

  protected findComponentInstance<T>(selector: Type<T>): T | undefined {
    return this.spectator.query(selector) ?? undefined;
  }

  protected findComponentInstances<T>(selector: Type<T>): T[] {
    return this.spectator.queryAll(selector);
  }

  protected findDebugElement(selector: string): DebugElement | undefined {
    return this.spectator.debugElement.query(By.css(selector)) ?? undefined;
  }

  protected findDebugElements(selector: string) {
    return this.spectator.debugElement.queryAll(By.css(selector));
  }

  protected findElement<ElementType = HTMLElement>(
    selector: string
  ): ElementType | undefined {
    return this.findDebugElement(selector)?.nativeElement ?? undefined;
  }

  protected findElements<ElementType = HTMLElement>(
    selector: string
  ): ElementType[] {
    return this.findDebugElements(selector).map(
      (debugElement) => debugElement.nativeElement
    );
  }
}
