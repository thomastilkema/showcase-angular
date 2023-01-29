import { Component, OnInit } from '@angular/core';
import { Route, UserService } from '@app/core';
import { map, Observable } from 'rxjs';

@Component({
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent implements OnInit {
  existingEmailAddress$: Observable<string>;
  isSignedUp = false;
  loginRoute = Route.LogIn;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.existingEmailAddress$ = this.userService
      .getOneUser()
      .pipe(map((user) => user.email));
  }

  onSignedUp() {
    this.isSignedUp = true;
  }
}
