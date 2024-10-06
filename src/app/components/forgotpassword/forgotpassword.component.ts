import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.afterSub?.unsubscribe()
  }

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService= inject(ToastrService);


  isLoading:boolean=false;
  step:number = 1 ;
  afterSub!:Subscription;




  // step one
  Verifyemailform:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
  })

  Verifyemail(){
    ////// to save the value and use it again at step 3 /////
    ////// make input email at step 3 ((readonly)) //////////
    let emailValue = this.Verifyemailform.get('email')?.value;
    this.resetPasswordFormGroup.get('email')?.patchValue(emailValue);
    ////// to save the value and use it again at step 3 /////
    this.isLoading = true;
    this._AuthService.setVerifyEmail( this.Verifyemailform.value ).subscribe({
      next:(res)=>
        {
          if(res.statusMsg == 'success' ){
            this.step = 2 ;
          }
          this.isLoading=false;
        }
    })
  }



  // step two
  Verifycodeform:FormGroup = new FormGroup({
    resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6}$/)]),
  })

  VerifycodeSubmit(){
    this.isLoading = true;
    this._AuthService.setVerifyCode(this.Verifycodeform.value).subscribe({
      next:(res)=>
        {
          if(res.status == 'Success' ){
            this.step = 3;
            console.log(res)
            console.log('yes')
          }
          this.isLoading=false;
        }
    })
  }




  // step three
  resetPasswordFormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern( /^\w{6,}$/ )]),
  })

  resetPassword(){

    this.isLoading = true;
    this._AuthService.setResetPassword(this.resetPasswordFormGroup.value).subscribe({
      next:(res)=>
        {
            setTimeout(() => {

              // 1- save token
              localStorage.setItem('userToken', res.token);

              // 2- Dcode token
              this._AuthService.saveUserData();

              // 3- navigate to home
              this._Router.navigate(['/home']);

            }, 1000);
          this.isLoading=false;
        }
    })
  }



}
