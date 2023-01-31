import { Component, OnInit } from '@angular/core';
import { UserAction } from '@app/store/user';
import { Store } from '@ngrx/store';
import { UserService } from '../../service';

@Component({
  selector: 'tms-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    // Get user from storage since we don't use a real api
    const userFromStorage = this.userService.getUserFromStorage();
    if (userFromStorage) {
      this.store.dispatch(UserAction.login(userFromStorage));
    }
  }
}
