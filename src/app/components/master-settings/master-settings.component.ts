import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { SensorService } from 'src/app/services/sensors/sensor.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-master-settings',
  templateUrl: './master-settings.component.html',
  styleUrls: ['./master-settings.component.css']
})
export class MasterSettingsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  panelOpenState = false;

  roles: Role[] = [];

  users: User[] = [];

  

  AddUserForm = new FormGroup({

    email: new FormControl('',[Validators.required, Validators.pattern(emailRegex)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    role_id: new FormControl('',Validators.required,)
   
  })


  

  constructor(private userService: UserService, private http : HttpClient,private _snackBar: MatSnackBar,private router : Router) { }

  

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/logged_in', {withCredentials: true})
    .subscribe(
      (res: any) => {
      },
      err => {
        this.router.navigate(['/login'])
      }    
  );

    this.getRoles();
    this.getUsers();
  }

  onSubmit(): void {

    if(this.AddUserForm.valid){


      var email = this.AddUserForm.getRawValue().email;
      var password = this.AddUserForm.getRawValue().password;
      var role_id = this.AddUserForm.getRawValue().role_id;

  
     

      this.userService.adduser({email,password,role_id}).subscribe(user => {
        this.users.push(user)
      });
      this.userService.getUsers().subscribe();
    
     

    }

    this.showSnack("User Created!");

  }

  getRoles(): void {

    this.userService.getRoles()
      .subscribe(roles => this.roles = roles);

  }

  getUsers(): void {

    this.userService.getUsers()
      .subscribe(users => this.users = users);

  
  }

  showSnack(message: string){

   
    this._snackBar.open(message,"close",{horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition});
  }

  onDelete(user: User): void {

   
    this.users = this.users.filter(h => h !== user); //updates view 
    this.userService.deleteUser(user).subscribe();

  }



}
