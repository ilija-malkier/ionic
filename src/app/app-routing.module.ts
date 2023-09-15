import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {CustomerHomeComponent} from "./customer-home/customer.home.component";
import {ProfileComponent} from "./profile-component/profile.component";
import {CarDetailsComponent} from "./car-details/car-details.component";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AddCarPostComponent} from "./add-car-post/add-car-post.component";
import {EditCardPostComponent} from "./edit-card-post/edit-card-post.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {CarDetailsResolverResolver} from "./car-details-resolver.resolver";


const routes: Routes = [
  {path:"customer",children:[

      {
        path: 'home',
        component: CustomerHomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }

    ]
  },
  {
    path:"car",children:[
      {path: ':id',component:CarDetailsComponent, resolve:{car:CarDetailsResolverResolver} }
    ]
  },
  {path:"seller",children:[
      {
        path: 'home',
        component: AdminHomeComponent
      },
      {
        path: 'post',
        children: [
          {path:'create',component:AddCarPostComponent},
          {path:'edit',component:EditCardPostComponent}
        ]
      }
    ]
  },
  {path:'profile',children:[
      {path: '',component: ProfileComponent}
    ]},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignUpComponent},
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   }
// ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
