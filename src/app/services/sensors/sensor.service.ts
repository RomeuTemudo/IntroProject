import { Injectable } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SENSORS } from 'src/app/mock.sensors';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor( private messageService: MessageService) { }

  getSensors(): Observable<Sensor[]>{

    const sensors = of(SENSORS);
    this.messageService.add('Sensor Service: sensors fetched!!');
    return sensors;
    
  }
}
