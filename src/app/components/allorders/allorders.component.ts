import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Iallorders } from '../../core/interfaces/iallorders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe , DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit ,OnDestroy {

  cartId :string | null = "";
  userData!:any;
  userId!:string;
  allOrdersList:Iallorders []= [] ;
  afterSub!:Subscription;




  private readonly _OrdersService = inject (OrdersService);
  private readonly _AuthService= inject (AuthService);



  ngOnInit(): void {


    if(localStorage.getItem('userToken') !== null)
      {
        this.userData = jwtDecode(localStorage.getItem('userToken')!)
        console.log(this.userData.id)
        this.userId = this.userData.id ;
      }



    this._OrdersService.getAllOrders(this.userId).subscribe({
      next: (res) =>
        {
          console.log(res)
          this.allOrdersList = res ;
        }
    })
  }



  ngOnDestroy(): void {
    this.afterSub?.unsubscribe();
  }



}
