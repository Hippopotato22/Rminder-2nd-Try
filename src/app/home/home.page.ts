import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage implements OnInit {
  stars: { top: string; left: string; scale: string; animationDelay: string }[] = [];
  cats: { top: string; left: string; animationDuration: string }[] = [];
  showCat: boolean = true; // To control cat visibility

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if we're on the 'new' page or an existing note
        if (this.router.url.includes('new') || this.router.url.match(/\/\d+/)) {
          this.showCat = false; // Hide the cat on the New Note page and existing notes
        } else {
          this.showCat = true; // Show the cat on other pages
        }
      }
    });
  } // Inject Router

  ngOnInit() {
    this.generateStars(150); // Generate 150 stars for more density
    this.generateCats(5); // Generate 5 flying cats
   
  }

  generateStars(count: number) {
    for (let i = 0; i < count; i++) {
      // Random vertical position limited to the top 50%
      const top = Math.random() * 50; // Random vertical position (0% to 50%)
      const left = Math.random() * 100; // Random horizontal position (0% to 100%)
      const scale = (Math.random() * (1.5 - 0.5) + 0.5).toString(); // Random scale between 0.5 and 1.5
      const animationDelay = Math.random() * 2 + 's'; // Random animation delay

      this.stars.push({ top: `${top}%`, left: `${left}%`, scale, animationDelay });
    }
  }


  generateCats(count: number) {
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 50; // Random vertical position (0% to 50%)
      const left = Math.random() * 100; // Random horizontal position (0% to 100%)
      const animationDuration = (Math.random() * 5 + 5) + 's'; // Random duration between 5s and 10s

      this.cats.push({ top: `${top}%`, left: `${left}%`, animationDuration });
    }
  }




  
}