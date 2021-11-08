import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/interfaces/category';
import { SensorService } from 'src/app/services/sensors/sensor.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Sensor } from 'src/app/interfaces/sensor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';







@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {
 

  categories: Category[] = [];
 

  sensors: Sensor[] = [];
  

  AddSensorForm = new FormGroup({

    name: new FormControl(''),
    description: new FormControl(''),
    category_id: new FormControl('')
   
  })

  caralho: FormControl[] = [];

  constructor(private router: Router, private http: HttpClient, private sensorService: SensorService, public dialogRef: MatDialogRef<AddSensorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    
    
    this.getCategories();

    
  }

  onSubmit(): void {

    
    if(this.AddSensorForm.valid){


      var name = this.AddSensorForm.getRawValue().name;
      var description = this.AddSensorForm.getRawValue().description;
      var category_id = this.AddSensorForm.getRawValue().category_id;

      this.sensorService.addSensor({ name, description, category_id } as unknown as Sensor)
      .subscribe(sensor => {
        if(this.data.onAdd) {
          this.data.onAdd(sensor);
        }
       
        this.sensors.push(sensor);
      });
      

      //call + get cookies
      /*this.http.post<Sensor>('http://localhost:8000/api/add_sensor',this.AddSensorForm.getRawValue())
        .subscribe(sensor => {
          this.sensors.push(sensor)
        });*/

        


       

        
      this.onClose();

      

      /*this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          
        },
        (err: Error)=> {
          alert(err.message);
        }
      );*/
    }
  }

  onClose(){

    this.AddSensorForm.reset();
    this.dialogRef.close();
    
  }

  
  getCategories(): void {

    this.sensorService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

}
