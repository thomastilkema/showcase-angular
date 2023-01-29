import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AuthService,
  isUserAlreadyExistsError,
  Route,
  UserService,
} from '@app/core';
import {
  createEmailFormControl,
  createPasswordFormControl,
  userWithEmailAddressExists,
  valuesMustBeEqual,
} from '@app/module/form';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'tms-sign-up-form',
  templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements OnInit {
  formGroup: FormGroup;
  isSubmitErrorUserAlreadyExists = false;
  logInRoute = Route.LogIn;
  submitRequest$: Observable<true | void>;

  @Output() signedUpEvent = new EventEmitter();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        email: createEmailFormControl('', [
          userWithEmailAddressExists(this.userService),
        ]),
        password: createPasswordFormControl(),
        passwordConfirm: createPasswordFormControl(),
      },
      {
        validators: valuesMustBeEqual('password', 'passwordConfirm'),
      }
    );

    this.submitRequest$ = this.getSubmitRequest();
  }

  onSubmitError(error: Error): void {
    this.isSubmitErrorUserAlreadyExists = isUserAlreadyExistsError(error);
  }

  onSubmitSuccess(): void {
    this.signedUpEvent.emit();
  }

  private getSubmitRequest(): Observable<true | void> {
    return of(null).pipe(
      switchMap(() => {
        const { email, password } = this.formGroup.value;
        return this.authService.signUp(email, password);
      })
    );
  }
}
