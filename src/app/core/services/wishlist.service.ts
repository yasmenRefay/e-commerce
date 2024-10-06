import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private _HttpClient:HttpClient) { }
  myHeaders:any = localStorage.getItem('userToken')


  AddproductToFavorit(id: string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      })
  }


  getproductsFromWishList():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/wishlist`)
  }



  removeproductsFromWishList(id: string):Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/wishlist/${id}`)
  }




}
