import { Injectable } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SENSORS } from 'src/app/mock.sensors';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient,HttpHeaders, HttpParamsOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor( private messageService: MessageService, private http: HttpClient) { }

  private sensorsURL = 'api/sensor_list';

  //wrap message service in a private func
  private log(message: string){

    this.messageService.add(`HeroService: ${message}`);
  }

  getSensors(): Observable<Sensor[]>{

    const sensors = of(SENSORS);
    this.messageService.add('Sensor Service: sensors fetched!!');
    return sensors;
    
  }
}
