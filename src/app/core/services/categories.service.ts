import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }


  private readonly _HttpClient=inject(HttpClient);

  getAllcategories():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories`)
  }


  getsubcategories(id: string):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${id}/subcategories`)
    // https://ecommerce.routemisr.com/api/v1/categories/6407ea3d5bbc6e43516931df/subcategories
  }


  getSpecificCategory(id: string | null):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/categories/${id}`)
  }
}
