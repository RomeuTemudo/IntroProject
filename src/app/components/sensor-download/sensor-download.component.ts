import { Component, Input, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { SensorService } from 'src/app/services/sensors/sensor.service';

@Component({
  selector: 'app-sensor-download',
  templateUrl: './sensor-download.component.html',
  styleUrls: ['./sensor-download.component.css']
})
export class SensorDownloadComponent implements OnInit {


  @Input() sensorID : any;

  sensorData: any

  valores: any
  datas: any

  
  

  constructor(private papa: Papa, private sensorService: SensorService) { }

  ngOnInit(): void {

  

  }


  downloadFile(): void{

    this.sensorService.getSensorData(this.sensorID)
    .subscribe(result => {

     
      let csv =  this.papa.unparse(result)

      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = `sensor_${this,this.sensorID}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    })



  }

  

}
