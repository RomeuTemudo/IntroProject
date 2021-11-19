import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { SensorsComponent } from './components/sensors/sensors.component';
import {MatListModule} from '@angular/material/list';
import { MessagesComponent } from './components/messages/messages.component';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { AddSensorComponent } from './components/add-sensor/add-sensor.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SensorDetailComponent } from './components/sensor-detail/sensor-detail.component';
import { SensorSearchComponent } from './components/sensor-search/sensor-search.component';
import { FilterPipe } from './Pipes/filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SensorUploadComponent } from './components/sensor-upload/sensor-upload.component';
import { MasterSettingsComponent } from './components/master-settings/master-settings.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SensorDownloadComponent } from './components/sensor-download/sensor-download.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,
    NotFoundComponent,
    HomeComponent,
    SensorsComponent,
    MessagesComponent,
    AddSensorComponent,
    SensorDetailComponent,
    SensorSearchComponent,
    FilterPipe,
    SensorUploadComponent,
    MasterSettingsComponent,
    SensorDownloadComponent

    
  
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSnackBarModule


    

  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddSensorComponent] //Dialog modal
})
export class AppModule { }
