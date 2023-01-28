import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-icon',
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() height = 24;
  @Input() name: string;
  @Input() width = 24;

  getImagePath() {
    return `/assets/img/icons.svg#${this.name}`;
  }
}
