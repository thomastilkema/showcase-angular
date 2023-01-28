import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type AlertType = 'danger' | 'info' | 'success';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() hasRole = true;
  @Input() type: AlertType = 'danger';

  getIconName(): string {
    const mappings = {
      danger: 'warning',
      info: 'info',
      success: 'checkmark',
    };

    return mappings[this.type];
  }

  isOfDangerType() {
    return this.type === 'danger';
  }

  isOfInfoType() {
    return this.type === 'info';
  }

  isOfSuccessType() {
    return this.type === 'success';
  }
}
