import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-pending',
  templateUrl: './pending.component.html',
})
export class PendingComponent {
  @Input() isPending = false;
}
