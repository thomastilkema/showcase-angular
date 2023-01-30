import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { selectUser, UserState } from '@app/store/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent implements OnInit {
  loggedInUser$: Observable<Readonly<UserState>>;

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select(selectUser);
  }

  logOut() {
    this.authService.logOut();
  }
}
