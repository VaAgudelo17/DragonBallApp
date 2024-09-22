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
  }


  private loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favIds = JSON.parse(favorites);
      this.favorites = new Set(favIds);
      this.loadFavoriteCharacters();  
    }
  }

  private loadFavoriteCharacters() {
    this.favorites.forEach((id) => {
      this.dragonBallSvc.getCharacterById(id).subscribe((character: any) => {
        this.favoriteCharacters.push(character);
      });
    });
  }

  goToCharacterDetail(id: string) {
    this.router.navigate(['character-detail', id]);
  }
}
