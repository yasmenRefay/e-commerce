import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { IspCategrois } from '../../core/interfaces/isp-categrois';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy {

private readonly _CategoriesService = inject (CategoriesService);


cartegoriesList : WritableSignal<Icategories[]> = signal([]);
spCategroisList : WritableSignal<IspCategrois[]> = signal([]);
afterSub!:Subscription;



  ngOnInit(): void {
    this._CategoriesService.getAllcategories().subscribe({
      next: (res) =>
        {
          this.cartegoriesList.set(res.data) ;
          console.log( res.data)
        }
    })

}


getspecific( id:string ):void
{
  this._CategoriesService.getsubcategories(id).subscribe({
    next: (res) =>
      {
        console.log( 'spec',res.data)
        this.spCategroisList.set(res.data);
      }
  })
}

ngOnDestroy(): void {
  this.afterSub?.unsubscribe();
}



}
