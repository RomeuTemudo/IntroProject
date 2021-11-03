import { Component, OnInit } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SENSORS } from 'src/app/mock.sensors';
import { SensorService } from 'src/app/services/sensors/sensor.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AddSensorComponent } from '../add-sensor/add-sensor.component';



@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  selectedSensor?: Sensor;
 
  sensors: Sensor[] = [];

  constructor(private sensorService: SensorService, private messageService: MessageService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getSensors();

  }

  getSensors(): void {

    this.sensorService.getSensors()
      .subscribe(sensors => this.sensors = sensors);
  }

  onSelect(sensor: Sensor): void {
    this.selectedSensor = sensor;

    this.messageService.add(`SensorComponent: Selected sensor id=${sensor.id}`);
  }

  onCreateSensor(){

    this.dialog.open(AddSensorComponent)

  }

}
