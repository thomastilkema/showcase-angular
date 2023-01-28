import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-label',
  templateUrl: './label.component.html',
})
export class LabelComponent {
  @Input() for: string;
}
