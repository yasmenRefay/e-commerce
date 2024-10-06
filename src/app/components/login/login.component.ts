import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  msgError:string="";
  isLoading:boolean=false;
  msgSuccess:boolean=false;
  afterLoginSub!:Subscription;


  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);


  loginform:FormGroup = new FormGroup({
    password: new FormControl(null,[Validators.required,Validators.pattern( /^\w{6,}$/ )]),
    email: new FormControl(null,[Validators.required,Validators.email]),
  })


  loginSubmit():void
  {
    if(this.loginform.valid)
      {
        this.isLoading = true;
        this.afterLoginSub = this._AuthService.setloginForm(this.loginform.value).subscribe
          ({
            next:(res) =>
              {
                if(res.message == 'success')
                  {
                    this.msgSuccess=true;

                    setTimeout(() => {

                      // 1- save token
                      localStorage.setItem('userToken', res.token);

                      // 2- Dcode token
                      this._AuthService.saveUserData();

                      // 3- navigate to home
                      this._Router.navigate(['/home']);

                    }, 1000);
                  }
                this.isLoading=false;
              },
            error:(err:HttpErrorResponse) =>
              {
                this.msgError=err.error.message;
                this.isLoading=false;
              }
          });
      }
  }

  ngOnDestroy(): void {
    this.afterLoginSub?.unsubscribe()
  }


}


