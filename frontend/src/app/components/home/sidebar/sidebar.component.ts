import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private auth: AuthService){}
  
  ngOnInit(): void {
  this.auth.authSubject.subscribe(authData=>{
    this.isLoggedIn = !!authData;
    this.isAdmin = authData?.userRole == 'ADMIN';
  })
  }
  

}
