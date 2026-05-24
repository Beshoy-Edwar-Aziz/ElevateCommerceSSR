import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [Navbar,RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  ngOnInit(): void {
   
  }
}
