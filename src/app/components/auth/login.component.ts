import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService) { }
  isSignUp = true;
  form: FormGroup;

  submit(): void {
    if (this.form.valid) {
      if (this.isSignUp) {
        this.auth.signUp(this.form.value).subscribe();
      } else {
        this.auth.signIn(this.form.value).subscribe();
      }
    }
  }

  onSwitchScreen(): void {
    this.form = this.fb.group({ email: '', password: '' });
    this.isSignUp = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({ email: '', password: '', fullName: '', username: '' });
  }
}
