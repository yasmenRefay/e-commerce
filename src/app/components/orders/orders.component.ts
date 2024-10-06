import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit ,OnDestroy {
  ngOnDestroy(): void {
    this.afterSub?.unsubscribe()
  }




  private readonly _ActivatedRoute= inject (ActivatedRoute);
  private readonly _OrdersService= inject (OrdersService);



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







  orderForm: FormGroup = new FormGroup({
    details:new FormControl(null , [Validators.required,Validators.minLength(3),Validators.maxLength(40)] ),
    phone:new FormControl(null , [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)] ),
    city:new FormControl(null , Validators.required ),
  })







  isLoading:boolean=false;
  msgSuccess:boolean=false;
  msgError:string="";

  orderSubmit():void
  {
    if(this.orderForm.valid)
      {
        this.isLoading = true;
        console.log(this.orderForm.value)
        this._OrdersService.checkOut(this.cartId , this.orderForm.value ).subscribe ({
          next: (res)=>
            {
              console.log(res)
              if(res.status === 'success')
              {
                window.open( res.session.url , '_self' )
              }
            }
        })
      }
  }


}
