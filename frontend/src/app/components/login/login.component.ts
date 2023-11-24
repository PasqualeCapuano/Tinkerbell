import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  loginF!:FormGroup;
constructor(private as:AuthService, private router:Router) { }

ngOnInit(): void {
this.loginForm= new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
})

}

login(){
    let value={
        username: this.loginForm.controls["username"].value,
        password: this.loginForm.controls['password'].value
    }

  this.as.login(value).subscribe((res)=>{
    console.log("LOGGED IN")
  })
}
}
