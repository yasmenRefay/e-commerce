import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../environment';
import { Iproducts } from '../interfaces/iproducts';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numCartItems: WritableSignal<number> = signal(0);


  constructor(private _HttpClient:HttpClient)
  {
    
  }
  private wishlistitems:Iproducts [] = [];


  myHeaders:any = localStorage.getItem('userToken')


////////////////////// add to cart function in home component /////////////////////////
  addProductToCart(id: string):Observable<any>
  {
    // post or put (1-url , 2-body , 3-options(headers) )
    // get or Delet (1-url , 2-options(headers) )
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      })
  }


////////////////////// add to cart function in cart component /////////////////////////
  addCartProducts():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/cart`)
  }


////////////////////// remove product function in cart component /////////////////////////
removeFromCart(id:string):Observable<any>
{  return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart/${id}`)
}


////////////////////// Update product function in cart component /////////////////////////
updateFromCart(id:string , count:number ):Observable<any>
{
  return this._HttpClient.put(`${Environment.baseUrl}/api/v1/cart/${id}`,
    {
      "count": count
    })
}


////////////////////// clear product function in cart component /////////////////////////
clearCart():Observable<any>
{
  return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart`)
}





}
