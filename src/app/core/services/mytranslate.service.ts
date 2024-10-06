import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  private readonly _TranslateService = inject ( TranslateService );
  private readonly _PLATFORM_ID = inject ( PLATFORM_ID );
  // use for prevent direct working with document
  private readonly _Renderer2 = inject ( RendererFactory2).createRenderer( null , null ); // use factory to create inctance of Render2

  constructor() {
    if(isPlatformBrowser(this._PLATFORM_ID))
    {
      this._TranslateService.setDefaultLang('en');
      this.setLang();
    }
  }


  setLang():void
  {
    let saveLang = localStorage.getItem(' lang ');
    if(saveLang !== null){
      this._TranslateService.use( saveLang ! )
    }
    if(saveLang === 'en')
    {
      this._Renderer2.setAttribute( document.documentElement ,'dir' , 'ltr');
      // to handel attribute of lang at the start of index html
      this._Renderer2.setAttribute( document.documentElement ,'lang' , 'en');
    } else if(saveLang === 'ar')
      {
        this._Renderer2.setAttribute( document.documentElement ,'dir' , 'rtl');
      // to handel attribute of lang at the start of index html
      this._Renderer2.setAttribute( document.documentElement ,'lang' , 'ar');
      }
  }



  changeLang( lang:string ):void
  {
    if(isPlatformBrowser(this._PLATFORM_ID))
    {
      localStorage.setItem(' lang ', lang );
      this._TranslateService.use( lang );
      this.setLang();
    }
  }



}
