import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
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

  @Output() chartUpdate = new EventEmitter();

   


  

  
  sensors: Sensor[] = [];
  

  dataFromSensor : any;

  constructor( private sensorService: SensorService) { }

  ngOnInit(): void {

  
    
  

  }

  
  selectedSensorID() {

    return this.sensorBind?.id
  }


  uploadSensorData($event: any){
    
    this.dataFromSensor = $event;

    console.log(this.sensorBind?.id);
    
    this.sensorService.addSensorData(this.dataFromSensor, this.sensorBind?.id).subscribe(results => {this.sensorChartUpdate(this.sensorBind?.id)});
    this.sensorChartUpdate(this.sensorBind?.id)

   
  }


  sensorChartUpdate($event : any){

  this.chartUpdate.emit($event);
  
  }


  UploadedFile(): void {


  }

  onSaveSensor(): void {

    console.log(this.sensorBind?.id);

    if(this.sensorBind){


      this.sensorService.updateSensor(this.sensorBind)
        .subscribe();

      

    }  

    if(this.sensorBindSearch){

      console.log("asaa");

      this.sensorService.updateSensor(this.sensorBindSearch).subscribe();
    }

  }

  



}
