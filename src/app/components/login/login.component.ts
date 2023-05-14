import  jwtDecode from 'jwt-decode';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  APImsg: string = '';
  constructor(
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private _AuthService: AuthService,
    private _ToastrService:ToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  loginForm!: FormGroup;
  createForm(): void {
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleLogin(form: FormGroup): void {
    this._AuthService.login(form.value).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          localStorage.setItem('userToken',response.token)
          this._AuthService.decodeUserData()
          this._Router.navigate(['/home']);
          this._ToastrService.success(`${this._AuthService.decodedData.getValue().first_name} ${this._AuthService.decodedData.getValue().last_name} <i class="fa-solid fa-heart"></i>`,'Welcome!',{enableHtml:true})
        } else {
          this.APImsg = response.message;
          console.log(response);
          this._ToastrService.warning(response.message,'error')
        }
      },
      error: (err) => {
        this.APImsg = err.errors.message;
      },
    });
  }
}

