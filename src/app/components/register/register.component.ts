import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
msgError:string="";
isLoading:boolean=false;
msgSuccess:boolean=false;
afterRegisterSub!:Subscription;

private readonly _AuthService=inject(AuthService);
private readonly _Router=inject(Router);


registerform:FormGroup = new FormGroup({
  name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  password: new FormControl(null,[Validators.required,Validators.pattern( /^\w{6,}$/ )]),
  rePassword: new FormControl(null),
  email: new FormControl(null,[Validators.required,Validators.email]),
}, this.confirmPassword)


registerSubmit():void
{
  if(this.registerform.valid)
    {
      this.isLoading = true;
      this.afterRegisterSub = this._AuthService.setRegisterForm(this.registerform.value).subscribe
        ({
          next:(res) =>
            {
              if(res.message == 'success')
                {
                  this.msgSuccess=true;
                  setTimeout(() => {
                    this._Router.navigate(['/login'])
                  }, 1000);
                }
              this.isLoading=false;
            }
        });
    }
}

confirmPassword( g:AbstractControl){
  if( g.get('password')?.value === g.get('rePassword')?.value )
    {
      return null
    }
  else
    {
      return {mismatch:true}
    }
}


ngOnDestroy(): void {
  this.afterRegisterSub?.unsubscribe()
}




}


