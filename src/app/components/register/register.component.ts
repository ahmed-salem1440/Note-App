import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
  registerForm!: FormGroup;
  createForm(): void {
    this.registerForm = this._FormBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
  }
  handleRegister(form: FormGroup): void {
    this._AuthService.register(form.value).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this._Router.navigate(['/login']);
          this._ToastrService.success('You have been registered successfully <i class="fa-solid fa-heart"></i>','Congratulations!',{enableHtml:true})
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
