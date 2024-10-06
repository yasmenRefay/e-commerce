import { Iproducts } from './../../core/interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  private readonly _WishlistService = inject(WishlistService) ;
  private readonly _ToastrService= inject(ToastrService);
  private readonly _CartService= inject(CartService);


  wishList : Iproducts [] = [] ;
  afterSub!:Subscription;


  ngOnInit(): void {
    this._WishlistService.getproductsFromWishList().subscribe({
      next: (res) =>
        {
          this.wishList = res.data ;
        }
    })
  }




removeproduct(id:string):void
{
  this._WishlistService.removeproductsFromWishList(id).subscribe({
    next:(res) =>
      {
        this._ToastrService.show( 'Item Removed From Cart' )
        this._WishlistService.getproductsFromWishList().subscribe({  // to show the last update after delete
          next: (res) => {
            this.wishList = res.data ;
          }
        })
      }
  })
}


// sweetalert
confirmRemove(id:string):void {
  Swal.fire({
    title: 'Do you want to remove this item?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      this.removeproduct(id);
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}






  addTocart(id:string):void
  {
    this._CartService.addProductToCart(id).subscribe({
      next:(res) =>
        {
          this._ToastrService.success(res.message , 'Done');
          this._CartService.numCartItems.set( res.numOfCartItems );
          this._WishlistService.getproductsFromWishList().subscribe({  // to show the last update after add
            next: (res) => {
              this.wishList = res.data ;
            }
          })
          this.removeproduct(id);
        }
    })
  }

  ngOnDestroy(): void {
    this.afterSub?.unsubscribe();
  }

}
