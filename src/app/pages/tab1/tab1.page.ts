import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})

export class Tab1Page implements OnInit {
  characters: any[] = [];
  allCharacters: any[] = []; 
  params = { page: 0, name: '' };
  allCharactersLoaded = false;

  constructor(private dragonBallSvc: DragonBallService, private router: Router ) {}

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  getCharacters(event?: any) {
    if (this.allCharactersLoaded) {
      if (event) event.target.complete();
      return;
    }

    this.params.page += 1;
    this.dragonBallSvc.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.items);
        this.allCharacters.push(...res.items); // Guarda todos los personajes
        console.log(this.characters);

        if (res.items.length === 0) {
          this.allCharactersLoaded = true;
        }

        if (event) event.target.complete();
      },
      error: (error: any) => {
        if (event) event.target.complete();
        console.error('Error fetching characters:', error);
      },
    });
  }


  searchCharacters(event?: any) {
  
    if (!this.params.name) {
      this.characters = this.allCharacters; 
      if (event) event.target.complete();
      return;
    }
    this.params.page = 0;
    this.characters = this.allCharacters.filter((character: any) => {
      return character.name.toLowerCase().includes(this.params.name.toLowerCase());

    }
    );
  
}
goToCharacterDetail(id: string) {
  this.router.navigate(['character-detail', id]);  
}
goToTab2() {
  this.router.navigate(['/tabs/tab2']);  // Navega a la pestaña tab2
}
}

