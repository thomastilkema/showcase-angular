import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  animations: [
    trigger('toggle', [
      state(
        'open',
        style({
          height: '*',
        })
      ),
      state(
        'closed',
        style({
          height: 0,
        })
      ),
      transition('open <=> closed', [animate('.2s')]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tms-expandable',
  templateUrl: './expandable.component.html',
})
export class ExpandableComponent {
  protected isOpen = false;

  toggleContent() {
    this.isOpen = !this.isOpen;
  }
}
