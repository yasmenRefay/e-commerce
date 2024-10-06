import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orderscash',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orderscash.component.html',
  styleUrl: './orderscash.component.scss'
})
export class OrderscashComponent implements OnInit ,OnDestroy {

  ngOnDestroy(): void {
    this.afterSub?.unsubscribe()
  }




  private readonly _ActivatedRoute= inject (ActivatedRoute);
  private readonly _OrdersService= inject (OrdersService);
  private readonly _Router= inject (Router);



  cartId :string | null = "";
  afterSub!:Subscription;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) =>
        {
          this.cartId = p.get('id')
          console.log(this.cartId)
        }
    })
  }







  ordercashForm: FormGroup = new FormGroup({
    details:new FormControl(null , [Validators.required,Validators.minLength(3),Validators.maxLength(40)] ),
    phone:new FormControl(null , [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)] ),
    city:new FormControl(null , Validators.required ),
  })







  isLoading:boolean=false;
  msgSuccess:boolean=false;
  msgError:string="";

  orderSubmit():void
  {
    if(this.ordercashForm.valid)
      {
        this.isLoading = true;
        console.log(this.ordercashForm.value)
        this._OrdersService.checkOutcash(this.cartId , this.ordercashForm.value ).subscribe ({
          next: (res)=>
            {
              console.log(res.status)
              this._Router.navigate(['/allorders'])

            }
        })
      }
  }

}
