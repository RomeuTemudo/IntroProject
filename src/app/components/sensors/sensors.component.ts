import { Component, OnInit } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SENSORS } from 'src/app/mock.sensors';
import { SensorService } from 'src/app/services/sensors/sensor.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { AddSensorComponent } from '../add-sensor/add-sensor.component';



@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  
 

  selectedSensor?: Sensor;
  selectedSensor2?: Sensor;
 
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
    this.selectedSensor2 = sensor;

    
    
    //this.messageService.add(`SensorComponent: Selected sensor id=${sensor.id}`);
  }

  onDelete(sensor: Sensor): void {

   
    this.sensors = this.sensors.filter(h => h !== sensor); //updates view 
    this.sensorService.deleteSensor(sensor).subscribe();

  }

  add(name: string, description: string, x: string): void {
    name = name.trim();

    var category_id = Number(x);


    if (!name) { return; }
    this.sensorService.addSensor({ name, description, category_id } as unknown as Sensor)
      .subscribe(sensor => {
        this.sensors.push(sensor);
      });
  }



  onAddSensor(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%"
    dialogConfig.height = "50%"
    dialogConfig.data = {
      onAdd: (sensor: Sensor) => {
        this.sensors.push(sensor);
      }
    };
    
    this.dialog.open(AddSensorComponent, dialogConfig)

    

  }

}
