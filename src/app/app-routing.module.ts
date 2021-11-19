import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { HomeComponent } from './components/home/home.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddSensorComponent } from './components/add-sensor/add-sensor.component';
import { MasterSettingsComponent } from './components/master-settings/master-settings.component';
import { SensorUploadComponent } from './components/sensor-upload/sensor-upload.component';



const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'recover-password', component:RecoverPasswordComponent},
  
  {path: 'home', component:HomeComponent, children:
  [
    {path: '', redirectTo: 'sensors', pathMatch:'full'}, //home por default abre o sensors
    {path: 'sensors',component:SensorsComponent},
    
   
  ]},
  {path: 'master-settings',component:MasterSettingsComponent},
  {path: 'add-sensor', component:AddSensorComponent},
  {path: 'sensors',component:SensorsComponent},
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: '**' ,component:NotFoundComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
