import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { Subscription } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent implements OnInit ,OnDestroy {

  afterSub!:Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
      const navbar = document.getElementById('navbar-default');
      const navbarLinks = document.querySelectorAll('a');

      if (toggleButton && navbar) {
        toggleButton.addEventListener('click', () => {
          navbar.classList.toggle('hidden');
          navbar.classList.toggle('block');
        });
      }

      navbarLinks.forEach(link => {
        link.addEventListener('click' , () => {
          navbar?.classList.add('hidden')
          navbar?.classList.remove('block');
        })
      });


    }
  }


  ngOnDestroy(): void {
    this.afterSub?.unsubscribe();
  }

}
