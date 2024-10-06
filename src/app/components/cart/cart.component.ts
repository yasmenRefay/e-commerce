import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy {

private readonly _CartService = inject( CartService );
private readonly _ToastrService= inject(ToastrService);



afterSub!:Subscription;
cartProductsList:Icart = { } as Icart ;
// carthidden :number = 0 ;
carthidden : WritableSignal<number> = signal(0)



ngOnInit(): void {
  this._CartService.addCartProducts().subscribe({
    next: (res) =>
      {
        this.cartProductsList = res.data ; // (total cart price) and (products)
        console.log('oninit',res.data)
        this.carthidden.set(res.data.totalCartPrice) 
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



removeproduct(id:string):void
  {


    this.afterSub = this._CartService.removeFromCart(id).subscribe({
      next:(res) =>
        {
          this.cartProductsList = res.data ; // to show the last update after delet
          console.log( 'remove',res.data)
          this._ToastrService.show( 'Item Removed From Cart' )
          this._CartService.numCartItems.set(res.numOfCartItems)
        }
    })
  }





updateproduct( id:string , count:number ):void
  {
    this._CartService.updateFromCart(id,count).subscribe({
      next:(res) =>
        {
          console.log(res)
          this.cartProductsList = res.data ; // to show the last update
        }
    })
  }






clearCart():void
  {
    this._CartService.clearCart().subscribe({
      next:(res) =>
        {
          if( res.message == 'success')
          this.cartProductsList = {} as Icart ; // to clear the cart
          this._ToastrService.info( 'Done Cart Clear' )
          this._CartService.numCartItems.set(0)
        }
    })
  }





  ngOnDestroy(): void {
    this.afterSub?.unsubscribe();
  }







}
