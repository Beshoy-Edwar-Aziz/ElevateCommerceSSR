import { Component } from '@angular/core';
import { Navbar } from '../../../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../../../../shared/components/footer/footer';



@Component({
  selector: 'app-user',
  imports: [Navbar,RouterOutlet,Footer],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {}
