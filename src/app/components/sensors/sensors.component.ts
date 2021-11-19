import { Component, OnInit } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SENSORS } from 'src/app/mock.sensors';
import { SensorService } from 'src/app/services/sensors/sensor.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { AddSensorComponent } from '../add-sensor/add-sensor.component';
import { Papa } from 'ngx-papaparse';
import { LoadingService } from 'src/app/services/loading.service';
import { SensorData } from 'src/app/interfaces/sensorData';
import { Chart, BarElement,PointElement, BarController,LineElement,LineController ,CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale} from 'chart.js';
import { Observable } from 'rxjs';







@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {


  loading$ = this.loadingService.loading$;

  
  isOrdered:boolean = false;

  valores:any;
  datas:any;

  

  myChart : any;
   
 


  caralho?: Sensor;


 

  selectedSensor?: Sensor;
  selectedSensor2?: Sensor;
 
  sensors: Sensor[] = [];

  sensorsData: SensorData[] = [];

  constructor(private sensorService: SensorService, private messageService: MessageService, private dialog: MatDialog, public loadingService: LoadingService){
    Chart.register(BarElement, BarController,PointElement, LineElement,LineController,CategoryScale, Decimation, Filler, Legend, Title, Tooltip,LinearScale);
  }






  ngOnInit(): void {


    this.getSensors();


   
}




  getSensors(): void {

    this.sensorService.getSensors()
      .subscribe(sensors => this.sensors = sensors);
  }
  
  sensorChartUpdate($event: any) {

    this.updatechart($event);
    
  }

  updatechart(sensor_id: any): void {

 

    this.sensorService.getSensorData(sensor_id)
    .subscribe(result => {
      // this.sensorsData = result,
        this.valores = result.map( result => result.value)
      this.datas = result.map(result => result.timestamp)

      if(this.myChart != null){
        this.myChart.destroy();   
      }
      //if not null destroy to render another one
        this.myChart = new Chart( 'canvas', {
        type: 'line',
        data: {
          labels: this.datas,
          datasets: [{
            data:  this.valores,
            borderColor: '#3cba9f',
            label: "Values"
            
          }]
        }
      
      });
    })

  }
  

  onSelect(sensor: Sensor): void {

    
   
 
    this.selectedSensor = sensor;

    this.sensorService.getSensorData(this.selectedSensor.id)
    .subscribe(result => {
     // this.sensorsData = result,
        this.valores = result.map( result => result.value)
      this.datas = result.map(result => result.timestamp)

      //if not null destroy to render another one
      if(this.myChart != null){
        this.myChart.destroy();
      }

       this.myChart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.datas,
          datasets: [{
            data:  this.valores,
            borderColor: '#3cba9f',
            label: "Values"
            
          }]
        }
      });    
    })

  }
  

  onOrderList(): void {


    this.isOrdered = !this.isOrdered

    console.log(this.isOrdered);
    
   

    this.sensorService.getSensors(this.isOrdered)
      .subscribe(sensors => this.sensors = sensors);
    
  

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
