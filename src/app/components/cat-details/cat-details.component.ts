import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icategories } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss'
})
export class CatDetailsComponent implements OnInit , OnDestroy {



  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);


  catDetails:Icategories | null = null ;
  getSpecificCateSub!:Subscription;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>
        {
          let idcat = p.get('id')
          this.getSpecificCateSub = this._CategoriesService.getSpecificCategory(idcat).subscribe({
            next:(res)=>
              {
                this.catDetails=res.data
              }
          })
        }
    })
  }



  ngOnDestroy(): void {
    this.getSpecificCateSub?.unsubscribe()
  }




}
