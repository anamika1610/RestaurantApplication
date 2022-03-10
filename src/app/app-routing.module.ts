import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RestaurantdashComponent } from './restaurantdash/restaurantdash.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'Login', pathMatch: 'full'
  },
  {
    path: 'Login', component: LoginComponent
  },
  {
    path: 'Signup', component: SignupComponent
  },
  {
    path: 'Restaurant', component: RestaurantdashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
