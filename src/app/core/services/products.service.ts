import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  constructor() { }
  private readonly _HttpClient=inject(HttpClient);

  getAllProduct():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products`)
  }


  getSpecificProduct(id:string| null):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products/${id}`)
  }


}
