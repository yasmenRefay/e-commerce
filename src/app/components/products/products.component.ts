import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,CarouselModule,RouterLink,SearchPipe,FormsModule,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {



  private readonly _ProductsService = inject (ProductsService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);


  productList:Iproducts[]=[];
  text : string="";
  getAllproductSub!:Subscription;




  ngOnInit(): void {
    this.getAllproductSub = this._ProductsService.getAllProduct().subscribe({
      next:(res)=>
        {
          this.productList=res.data;
        }
    })
  }



  addCart(id:string):void
  {
    this.getAllproductSub = this._CartService.addProductToCart(id).subscribe({
      next:(res) =>
        {
          this._ToastrService.success(res.message , 'Done')
        }
    })
  }


  ngOnDestroy(): void {
    this.getAllproductSub?.unsubscribe()
  }


}
