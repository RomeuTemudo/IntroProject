import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/interfaces/category';
import { SensorService } from 'src/app/services/sensors/sensor.service';





@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {


  

  categories: Category[] = [];

  AddSensorForm = new FormGroup({

    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl('')
   
  })

  

  constructor(private router: Router, private http: HttpClient, private sensorService: SensorService ) { }

  ngOnInit(): void {

    this.getCategories();
  }

  onSubmit(): void {

    
    if(this.AddSensorForm.valid){

   
      console.log(this.AddSensorForm.getRawValue());

      //call + get cookies
      this.http.post('http://localhost:8000/api/login',this.AddSensorForm.getRawValue(), {withCredentials: true})
        .subscribe(() => this.router.navigate(['/home']));

      /*this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          
        },
        (err: Error)=> {
          alert(err.message);
        }
      );*/
    }
  }

  getCategories(): void {

    this.sensorService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

}
