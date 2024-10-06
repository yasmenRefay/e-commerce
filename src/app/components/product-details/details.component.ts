import { Subscription } from 'rxjs';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  }




  // at start equall null so the section not appear  //
  // (((before update))) productDetails:Iproducts = { } as Iproducts ;
  productDetails:Iproducts | null = null ;
  imgList!:any;
  getSpecificProductSub!:Subscription;

  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>
        {
          let idProduct = p.get('id')
          this.getSpecificProductSub = this._ProductsService.getSpecificProduct(idProduct).subscribe({
            next:(res)=>
              {
                this.imgList=res.data.images
                this.productDetails=res.data
              }
          })
        }
    })
  }


  addToCart(id:string) : void {
    this._CartService.addProductToCart(id).subscribe({
      next : (res) => {
        console.log(res)
        this._ToastrService.success(res.message , 'Done');
        this._CartService.numCartItems.set( res.numOfCartItems )
      }
    })
  }



  ngOnDestroy(): void {
    this.getSpecificProductSub?.unsubscribe()
  }




  }

