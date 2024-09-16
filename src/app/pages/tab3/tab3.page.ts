import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favoriteCharacters: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    //que aparezca una lista de los personajes que se añadieron en tab1
    const favorites = localStorage.getItem('favoriteCharacters');
    if (favorites) {
      this.favoriteCharacters = JSON.parse
      (favorites);
      console.log("personaje fav agregado")
      }
    else {
      this.favoriteCharacters = [];

    }
      


  }

  goToCharacterDetail(id: string) {
    this.router.navigate(['character-detail', id]);
  }
}
