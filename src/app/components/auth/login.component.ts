import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


const required = [Validators.required];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private fb: FormBuilder, private auth: AuthService,
              private snackBar: MatSnackBar) { }
  showLoader = false;
  isSignUp = true;
  form: FormGroup;

  submit(): void {
    const resetFormOnError = err => {
      this.showLoader = false;
      console.error('err:', err);
      this.snackBar.open(err.error.error, 'Http Error', {
        duration: 7000,
      });
      setTimeout(() => { this.formGroupDirective.resetForm(); }, 300);
    };

    if (this.form.valid) {
      this.showLoader = true;
      if (this.isSignUp) {
        this.auth.signUp(this.form.value).subscribe((res) => {
          this.showLoader = false;
        }, resetFormOnError);
      } else {
        this.auth.signIn(this.form.value).subscribe((res) => {
          this.showLoader = false;
        }, resetFormOnError);
      }
    }
  }

  onSwitchScreen(form: NgForm): void {
    this.form = this.fb.group({ email: ['', [...required, Validators.email]],
    password: ['', [...required, Validators.minLength(8)]] });
    this.formGroupDirective.resetForm();
    this.isSignUp = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({ email: ['', [...required, Validators.email]],
    password: ['', [...required, Validators.minLength(8)]],
    fullName: ['', [...required, Validators.minLength(6)]],
    username: ['', [...required, Validators.minLength(5)]] });
  }
}
