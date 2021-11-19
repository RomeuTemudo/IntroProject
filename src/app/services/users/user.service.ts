import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient,HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { catchError,map,tap } from 'rxjs/operators';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';


const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type':  'application/json',
   
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


 

  constructor( private messageService: MessageService, private http: HttpClient) { }

 
  private getRolesUrl = 'http://localhost:8000/api/get_roles';
  private AddUserUrl = 'http://localhost:8000/api/add_user';
  private getUsersUrl = 'http://localhost:8000/api/get_users';
  private deleteUserUrl = 'http://localhost:8000/api/delete_user';


  getRoles(): Observable<Role[]>{

    return this.http.get<Role[]>(this.getRolesUrl)
      .pipe(
        tap(_ => this.log('fetched roles')),
        catchError(this.handleError<Role[]>('List of roles', []))
      );

  }

  adduser( user: any){

    
    return this.http.post<User>(this.AddUserUrl,JSON.stringify(user),httpOptions).pipe(
      tap(_ => this.log('new sensor created'))

    );


  }

  getUsers(): Observable<User[]>{

   
    //if object -> Observable result with the RxJS map() operator
    
    return this.http.get<User[]>(this.getUsersUrl)
      .pipe(
        tap(_ => this.log('fetched sensors')),
        catchError(this.handleError<User[]>('List of users', []))
      );
    
  }

  deleteUser(user: User): Observable<User[]>{

    return this.http.post<User[]>(this.deleteUserUrl,user,httpOptions)
      .pipe(
        tap(_ => this.log('sensor gone')),
        catchError(this.handleError<User[]>('List of sensors', []))
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