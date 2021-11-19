import { Component,OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/interfaces/category';
import { SensorService } from 'src/app/services/sensors/sensor.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Sensor } from 'src/app/interfaces/sensor';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { LoadingService } from 'src/app/services/loading.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css'],
})
export class AddSensorComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  categories: Category[] = [];

  msg: any;

  dataFromSensor: any;

  sensors: Sensor[] = [];

  AddSensorForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    category_id: new FormControl('', Validators.required),
  });

  //starts as false , defined on service!
  loading$ = this.loadingService.loading$;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private sensorService: SensorService,
    private papa: Papa,
    public loadingService: LoadingService,
    public dialogRef: MatDialogRef<AddSensorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  uploadSensorData($event: any) {
    this.dataFromSensor = $event;
  }

  showSnack(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onSubmit(dataFromSensor: any): void {
    if (this.AddSensorForm.valid) {
      var name = this.AddSensorForm.getRawValue().name;
      var description = this.AddSensorForm.getRawValue().description;
      var category_id = this.AddSensorForm.getRawValue().category_id;
      var sensorData = dataFromSensor;

      this.sensorService
        .addSensor({ name, description, category_id } as unknown as Sensor)
        .subscribe((sensor) => {
          if (this.data.onAdd) {
            this.data.onAdd(sensor);
          }

          this.sensors.push(sensor);

          //after create and push add data
          this.sensorService.addSensorData(sensorData).subscribe();
        });

      this.showSnack('Sensor Created!');

      this.onClose();
    }
  }

  onClose() {
    this.AddSensorForm.reset();
    this.dialogRef.close();
  }

  getCategories(): void {
    this.sensorService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }
}
