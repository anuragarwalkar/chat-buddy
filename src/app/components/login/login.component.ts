import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
  });

  submit(): void {
    if (this.form.valid) {

    }
  }

  ngOnInit(): void {
  }

}
