import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import{delay} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = '';
  display = false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;


  constructor(private http: HttpClient, private router: Router, private observer: BreakpointObserver ) { }


  ngOnInit(): void {


   this.http.get('http://localhost:8000/api/logged_in', {withCredentials: true})
      .subscribe(
        (res: any) => {
          this.message = `Hello, ${res.email}`;
        },
        err => {
          this.router.navigate(['/login'])
        }    
    );

  }

 
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }



 

  logout(): void {

    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true}).subscribe()

  }

  showMasterdata(): void {

    this.display = !this.display;

  }

  showCompanies(): void {

    this.display = !this.display;
    

  }

}
