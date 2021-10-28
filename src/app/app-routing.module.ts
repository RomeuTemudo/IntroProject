import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { HomeComponent } from './components/home/home.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { MessagesComponent } from './components/messages/messages.component';



const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'sensors',component:SensorsComponent},
  {path: 'recover-password', component:RecoverPasswordComponent},
  
  {path: 'home', component:HomeComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: '**' ,component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
