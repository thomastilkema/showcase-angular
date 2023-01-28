import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Spectator } from '@ngneat/spectator';

export class PageObject<Component> {
  tick: Spectator<Component>['tick'];

  constructor(protected readonly spectator: Spectator<Component>) {
    this.tick = this.spectator.tick;
  }

  get componentInstance() {
    return this.spectator.component;
  }

  get nativeElement(): HTMLElement {
    return this.spectator.element;
  }

  click(element: HTMLElement | null) {
    if (element) {
      element.click();
    }
  }

  detectChanges() {
    this.spectator.detectChanges();
  }

  detectComponentChanges() {
    this.spectator.detectComponentChanges();
  }

  getInnerTextOf(element?: HTMLElement) {
    return element?.innerText.trim();
  }

  protected findComponentInstance<T>(
    componentInstance: Type<T>
  ): T | undefined {
    return this.spectator.query(componentInstance) ?? undefined;
  }

  protected findComponentInstances<T>(componentInstance: Type<T>): T[] {
    return this.spectator.queryAll(componentInstance);
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

  protected getInnerTextByCss(selector: string) {
    return this.getInnerTextOf(this.findElement(selector));
  }
}
