import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit ,OnDestroy {

  countNum:Signal<number> = computed( () =>  this._CartService.numCartItems()  );
  afterSub!:Subscription;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  private readonly _MytranslateService = inject (MytranslateService);
  private readonly _CartService = inject (CartService);


  // to mark inside lang you use without private to use it in html file when click
  readonly _TranslateService = inject (TranslateService);


  //to make logout use this service without private to use it in html file when click
  readonly _AuthService=inject(AuthService)

  ngOnInit(): void {

  this._CartService.addCartProducts().subscribe({
    next : (res)=>
      {
        this._CartService.numCartItems.set(res.numOfCartItems)
      }
  })


  // for open toggleButton in small screens
  if (isPlatformBrowser(this.platformId)) {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const dropdownHoverButton = document.querySelector('[data-dropdown-toggle="dropdownHover"]');
    const navbar = document.getElementById('navbar-default');
    const dropdownHover = document.getElementById('dropdownHover');
    const navbarLinks = document.querySelectorAll('.navLink');


    if (toggleButton && navbar) {
      toggleButton.addEventListener('click', () => {
        navbar.classList.toggle('hidden');
        navbar.classList.toggle('block');
      });
    }


    if (dropdownHoverButton && dropdownHover) {
      dropdownHoverButton.addEventListener('click', () => {
        dropdownHover.classList.toggle('hidden');
        dropdownHover.classList.toggle('block');
      });
    }



    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
          navbar?.classList.add('hidden');
          navbar?.classList.remove('block');
      });
  });


  }

    // this._CartService.numCartItems.subscribe({
    //   next : (data)=>
    //     {
    //       this.countNum = data ;
    //     }
    // })
  }

  change( lang : string ):void
  {
    this._MytranslateService.changeLang( lang );
  }


  ngOnDestroy(): void {
    this.afterSub?.unsubscribe();
  }



}
