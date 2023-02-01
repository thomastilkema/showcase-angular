import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerStateSnapshot: RouterStateSnapshot) {
    const appTitle = 'Showcase of how I write an Angular app';
    const currentRouteTitle = this.buildTitle(routerStateSnapshot);
    const pageTitle = currentRouteTitle
      ? `${currentRouteTitle} | ${appTitle}`
      : appTitle;
    this.title.setTitle(pageTitle);
  }
}
