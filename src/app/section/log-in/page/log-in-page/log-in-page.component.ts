import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbUser, Route, UserService } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'tms-login-page',
  templateUrl: './log-in-page.component.html',
})
export class LogInPageComponent implements OnInit {
  fakeUser$: Observable<DbUser>;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.fakeUser$ = this.userService.getOneUser();
  }

  onLoggedIn() {
    this.router.navigateByUrl(Route.Dashboard);
  }
}
