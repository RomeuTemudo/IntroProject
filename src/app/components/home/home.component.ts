import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/logged_in', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.email}`;
      },
      err => {
        this.router.navigate(['/login'])
      }

    
    );
  }

  logout(): void {

    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true}).subscribe()

  }

}
