import { Routes } from '@angular/router';
import { authGuard } from './core/guardes/auth.guard';
import { logedGuard } from './core/guardes/loged.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [logedGuard],
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot',
        loadComponent: () => import('./components/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent)
      }
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        title: 'Home'
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent),
        title: 'Brands'
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart'
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories'
      },
      {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent),
        title: 'Products'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/product-details/details.component').then(m => m.DetailsComponent),
        title: 'Details'
      },
      {
        path: 'catDetails/:id',
        loadComponent: () => import('./components/cat-details/cat-details.component').then(m => m.CatDetailsComponent),
        title: 'CatDetails'
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'Allorders'
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent),
        title: 'Orders'
      },
      {
        path: 'orderscash/:id',
        loadComponent: () => import('./components/orderscash/orderscash.component').then(m => m.OrderscashComponent),
        title: 'Orderscash'
      },
      {
        path: 'wishList',
        loadComponent: () => import('./components/wish-list/wish-list.component').then(m => m.WishListComponent),
        title: 'WishList'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent)
  }
];
























































// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { NotfoundComponent } from './components/notfound/notfound.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { BrandsComponent } from './components/brands/brands.component';
// import { CartComponent } from './components/cart/cart.component';
// import { CategoriesComponent } from './components/categories/categories.component';
// import { HomeComponent } from './components/home/home.component';
// import { ProductsComponent } from './components/products/products.component';
// import { authGuard } from './core/guardes/auth.guard';
// import { logedGuard } from './core/guardes/loged.guard';
// import { DetailsComponent } from './components/product-details/details.component';
// import { CatDetailsComponent } from './components/cat-details/cat-details.component';
// import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
// import { AllordersComponent } from './components/allorders/allorders.component';
// import { OrdersComponent } from './components/orders/orders.component';
// import { OrderscashComponent } from './components/orderscash/orderscash.component';
// import { WishListComponent } from './components/wish-list/wish-list.component';

// export const routes: Routes = [
//   {path:'',component:AuthLayoutComponent, canActivate:[logedGuard],
//     children:[
//       {path:'',redirectTo:'login',pathMatch:'full'},
//       {path:'login',component:LoginComponent},
//       {path:'register',component:RegisterComponent},
//       {path:'forgot',component:ForgotpasswordComponent},
//     ]},
//   {path:'',component:BlankLayoutComponent ,canActivate:[authGuard] ,
//     children:[
//       {path:'',redirectTo:'home',pathMatch:'full'},
//       {path:'home',component:HomeComponent,title:'Home'},
//       {path:'brands',component:BrandsComponent,title:'Brands'},
//       {path:'cart',component:CartComponent,title:'Cart'},
//       {path:'categories',component:CategoriesComponent,title:'Categories'},
//       {path:'products',component:ProductsComponent,title:'Products'},
//       {path:'details/:id',component:DetailsComponent,title:'Details'},
//       {path:'catDetails/:id',component:CatDetailsComponent,title:'CatDetails'},
//       {path:'allorders',component:AllordersComponent,title:'Allorders'},
//       {path:'orders/:id',component:OrdersComponent,title:'Orders'},
//       {path:'orderscash/:id',component:OrderscashComponent,title:'Orderscash'},
//       {path:'wishList',component:WishListComponent,title:'WishList'}
//   ]},







//   {path:'**',component:NotfoundComponent}
// ];
