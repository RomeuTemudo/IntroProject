import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    
    if(this.loginForm.valid){

      //call + get cookies
      this.http.post('http://localhost:8000/api/login',this.loginForm.getRawValue(), {withCredentials: true})
        .subscribe(() => this.router.navigate(['/home']));

      /*this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          
        },
        (err: Error)=> {
          alert(err.message);
        }
      );*/
    }
  }

}
