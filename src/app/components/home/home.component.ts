import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CommonModule, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CarouselModule,RouterLink,SearchPipe,FormsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


callingApi:boolean=false;
datacoming:boolean=false;
[x: string]: any;
text : string="";
found : boolean = false ;
notFound : boolean = false ;




  private readonly _ProductsService= inject(ProductsService);
  private readonly _CategoriesService= inject(CategoriesService);
  private readonly _CartService= inject(CartService);
  private readonly _ToastrService= inject(ToastrService);
  private readonly _WishlistService= inject(WishlistService);



  productList:Iproducts[]=[];
  categoryList:Icategories[]=[];
  wishListId :Iproducts[]=[] ;




  private storageWishListItemskey = 'WishListItems'

  constructor(){
    const storedWishListItems = localStorage.getItem(this.storageWishListItemskey);

    if(storedWishListItems) {
      this.wishListId = JSON.parse(storedWishListItems);    }
  }



///////////////////////////////////// owl carsoul dynamic ///////////////////////////////////////////////
  customCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    // autoplay for slider
    autoplay:true,
    autoplayTimeout:2000 ,
    pullDrag: false,
    dots: false,
    navSpeed: 1200,
    navText: ['', ''],
    rtl:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 7
      }
    },
    nav: true,
  }


///////////////////////////////////// owl carsoul ststic ///////////////////////////////////////////////
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    rtl:true,
    navText: ['', ''],
    items: 1,
    nav: true
  }







  ngOnInit(): void {
    this.callingApi=true;


    this._CategoriesService.getAllcategories().subscribe({
      next:(res)=>
        {
          this.datacoming=true;
          this.callingApi=false;
          this.categoryList= res.data;
        }
    })




    this._ProductsService.getAllProduct().subscribe({
      next:(res)=>
        {
          this.datacoming=true;
          this.callingApi=false;
          this.productList = res.data;
        }
    })



// cheack about products in the wish list
// check():void {
  this._WishlistService.getproductsFromWishList().subscribe({
    next: (res) =>
      {
        this.wishListId = res.data
        localStorage.setItem(this.storageWishListItemskey , JSON.stringify(this.wishListId) );
      }
  })
// }




  }



  addCart(id:string):void
  {
    this._CartService.addProductToCart(id).subscribe({
      next:(res) =>
        {
          this._ToastrService.success(res.message , 'Done');
          this._CartService.numCartItems.set( res.numOfCartItems );
        }
    })
  }





  addRemovewishList( product : Iproducts ): void {
    this._WishlistService.getproductsFromWishList().subscribe({
      next: (res) =>
        {
          this.wishListId = res.data;
          localStorage.setItem(this.storageWishListItemskey , JSON.stringify(this.wishListId) );
        }
    })
  if(this.wishListId.find(item => item.id === product.id))
  {
    this.removeFromWishlist(product.id);
    this._WishlistService.getproductsFromWishList().subscribe({
      next: (res) =>
        {
          this.wishListId= res.data;
          localStorage.setItem(this.storageWishListItemskey , JSON.stringify(this.wishListId) );
        }
    })
  } else {
    this.addToWishlist(product.id);
    this._WishlistService.getproductsFromWishList().subscribe({
      next: (res) =>
        {
          this.wishListId = res.data;
          localStorage.setItem(this.storageWishListItemskey , JSON.stringify(this.wishListId) );
        }
    })
  }
}



  isInWishList(product : Iproducts) : boolean
  {
    return   this.wishListId.find(item => item.id === product.id)? true : false ;
  }





  removeFromWishlist(id:string) : void {
    this._WishlistService.removeproductsFromWishList(id).subscribe({
      next: (res) =>
      {
        this.wishListId = res.data ;
        localStorage.setItem(this.storageWishListItemskey , JSON.stringify(this.wishListId) );
      }
    })
  }



  addToWishlist(id:string) : void {
    this._WishlistService.AddproductToFavorit(id).subscribe({
          next: (res) =>
          {
            this.wishListId= res.data ;
            localStorage.setItem(this.storageWishListItemskey , JSON.stringify(this.wishListId) );
          }
        })
      }







}
