import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any = {token : localStorage.getItem('userToken') }

  checkOut(idCart:string| null , shippingDetails:object):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=http://localhost:3000`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }



  checkOutcash(idCart:string| null , shippingDetails:object):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/${idCart}`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }



  getAllOrders(idCart: string | null):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/orders/user/${idCart}`
    )
  }



}
