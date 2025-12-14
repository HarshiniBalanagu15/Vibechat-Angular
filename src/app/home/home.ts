import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('VibeChat');
  
  constructor(private router: Router){}
  handleButtonClick() {
    this.router.navigate(['/login'])
  }
}
