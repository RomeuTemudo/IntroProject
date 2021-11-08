import { Component, OnInit,Input } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SensorService } from 'src/app/services/sensors/sensor.service';


@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {

  @Input() sensorBind?: Sensor;
  @Input() sensorBindSearch?: Sensor;
  
  sensors: Sensor[] = [];

  

  constructor( private sensorService: SensorService) { }

  ngOnInit(): void {


  }

  onSaveSensor(): void {

    if(this.sensorBind){

      console.log(this.sensorBind);

      this.sensorService.updateSensor(this.sensorBind)
        .subscribe();

      

    }  

    if(this.sensorBindSearch){

      this.sensorService.updateSensor(this.sensorBindSearch).subscribe();
    }

  }

  



}
