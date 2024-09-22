import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonBallService } from 'src/app/services/dragon-ball.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favoriteCharacters: any[] = [];  
  favorites: Set<string> = new Set<string>();  

  constructor(private router: Router, private dragonBallSvc: DragonBallService) {}

  ngOnInit() {
    this.loadFavorites();
    window.addEventListener('storage', () => {
      this.loadFavorites();
    });
  
  }
///metodo para que cargue los personajes fav sin necesidad de recargar la pagina 
  ionViewWillEnter() {
    this.loadFavorites();
  }

  goToCharacterDetail(id: string) {
    this.router.navigate(['character-detail', id]);
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = new Set<string>(JSON.parse(storedFavorites));
      this.getFavoriteCharacters();
    }
  }

  getFavoriteCharacters(): void {
    this.favoriteCharacters = []; 
    this.favorites.forEach((id) => {
      this.dragonBallSvc.getCharacterById(id).subscribe({
        next: (character) => {
          this.favoriteCharacters.push(character);
        },
        error: (error) => {
          console.error('Error fetching character:', error);
        },
      });
    });
  }

}
