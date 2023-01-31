import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService, isUserNotFoundError, Route, User } from '@app/core';

import {
  createEmailFormControl,
  createPasswordFormControl,
} from '@app/module/form';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'tms-log-in-form',
  templateUrl: './log-in-form.component.html',
})
export class LogInFormComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitErrorUserNotFound = false;
  signUpRoute = Route.SignUp;
  submitRequest$: Observable<User | void>;

  @Output() loggedInEvent = new EventEmitter();

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: createEmailFormControl(),
      password: createPasswordFormControl(),
    });

    this.submitRequest$ = this.getSubmitRequest();
  }

  onSubmitError(error: Error): void {
    this.isSubmitErrorUserNotFound = isUserNotFoundError(error);
  }

  onSubmitSuccess() {
    this.loggedInEvent.emit();
  }

  private getSubmitRequest(): Observable<User | void> {
    return of(null).pipe(
      switchMap(() => {
        const { email, password } = this.formGroup.value;
        return this.authService.logIn(email, password);
      })
    );
  }
}
