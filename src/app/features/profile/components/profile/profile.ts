import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Footer } from '../../../../shared/components/footer/footer';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet,Navbar,Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}
