import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor( private _HttpClient : HttpClient ) { };

  getAllBrands():Observable<any>
    {
      return this._HttpClient.get(`${Environment.baseUrl}/api/v1/brands`);
    }


  getSpecificBrand(id:string):Observable<any>
    {
      return this._HttpClient.get(`${Environment.baseUrl}/api/v1/brands/${id}`);
    }



}
