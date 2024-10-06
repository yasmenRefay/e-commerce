import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { Ibrands } from '../../core/interfaces/ibrands';
import { IspecificBrand } from '../../core/interfaces/ispecific-brand';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy {


  private readonly _BrandsService = inject (BrandsService);


  brandsList:Ibrands[]=[];
  specificBrand:IspecificBrand[]=[];
  getAllbrandsSub!:Subscription;


  ngOnInit(): void {
    this.getAllbrandsSub = this._BrandsService.getAllBrands().subscribe({
      next:(res)=>
        {
          this.brandsList = res.data;
        }
    })
  }

  showSepacificBrands(id:string):void
  {
    this.getAllbrandsSub = this._BrandsService.getSpecificBrand(id).subscribe({
      next:(res)=>
        {
          this.specificBrand = res.data;
        }
    })
  }


  ngOnDestroy(): void {
    this.getAllbrandsSub?.unsubscribe();
  }




}
