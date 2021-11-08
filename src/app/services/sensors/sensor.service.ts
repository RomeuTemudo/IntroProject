import { Injectable } from '@angular/core';
import { Sensor } from 'src/app/interfaces/sensor';
import { SENSORS } from 'src/app/mock.sensors';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient,HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { catchError,map,tap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SensorService {


 

  constructor( private messageService: MessageService, private http: HttpClient) { }

  private sensorListUrl = 'http://localhost:8000/api/sensor_list';
  private categoriesListurl = 'http://localhost:8000/api/categories';
  private sensorDeleteUrl = 'http://localhost:8000/api/delete_sensor';
  private sensorEditUrl = 'http://localhost:8000/api/update_sensor';
  private sensorAddUrl = 'http://localhost:8000/api/add_sensor';
  private sensorSearchUrl = 'http://localhost:8000/api/search_sensor';


  getCategories(): Observable<Category[]>{

    return this.http.get<Category[]>(this.categoriesListurl)
      .pipe(
        tap(_ => this.log('fetched sensors')),
        catchError(this.handleError<Category[]>('List of sensors', []))
      );

  }
  

  getSensors(): Observable<Sensor[]>{

   
    //if object -> Observable result with the RxJS map() operator
    
    return this.http.get<Sensor[]>(this.sensorListUrl)
      .pipe(
        tap(_ => this.log('fetched sensors')),
        catchError(this.handleError<Sensor[]>('List of sensors', []))
      );
    
  }

  searchSensors(term: string): Observable<Sensor[]>{

    if(!term.trim()){

      return of([])
    }

    return this.http.get<Sensor[]>(`${this.sensorSearchUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found sensors matching "${term}"`) :
          this.log(`no sensors matching "${term}"`)),
        catchError(this.handleError<Sensor[]>('List of sensors', []))
      );

  }

  deleteSensor(sensor: Sensor): Observable<Sensor[]>{

    return this.http.post<Sensor[]>(this.sensorDeleteUrl,sensor,httpOptions)
      .pipe(
        tap(_ => this.log('sensor gone')),
        catchError(this.handleError<Sensor[]>('List of sensors', []))
      );

  }

  updateSensor(sensor: Sensor): Observable<Sensor[]>{

    return this.http.post<Sensor[]>(this.sensorEditUrl,sensor,httpOptions)
      .pipe(
        tap(_ => this.log('sensor updated')),
        catchError(this.handleError<Sensor[]>('List of sensors', []))
      )


  }

  addSensor(sensor: Sensor): Observable<Sensor> {

    console.log(sensor);
    return this.http.post<Sensor>(this.sensorAddUrl, sensor, httpOptions).pipe(
      tap(_ => this.log('new sensor created')),
      catchError(this.handleError<Sensor>('addHero'))
    );
  }

 

  //wrap message service in a private func
  private log(message: string){

    this.messageService.add(`SensorService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //continuar a implementar , url com o id do sensor direto
  /*getSensor(id: number): Observable<Sensor> {

    const url = `${this.sensorsURL}/${id}`;

    return this.http.get<Sensor>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Sensor>(`getHero id=${id}`))
    );
  }*/
}
