import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { LoginPromptComponent } from 'src/app/components/login-prompt/login-prompt.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  favoriteCharacters: any[] = [];
  favorites: Set<string> = new Set<string>();

  constructor(
    private router: Router,
    private dragonBallSvc: DragonBallService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    window.addEventListener('storage', () => {
      this.loadFavorites();
    });
  }

  ionViewWillEnter() {
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      const modal = await this.modalController.create({
        component: LoginPromptComponent
      });
      await modal.present();
      return;
    }
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
    const characterRequests = Array.from(this.favorites).map((id) =>
      this.dragonBallSvc.getCharacterById(id).pipe(
        catchError((error) => {
          console.error('Error fetching character:', error);
          return of(null);
        })
      )
    );

    forkJoin(characterRequests).subscribe((characters) => {
      console.log('Fetched characters:', characters);

      characters.forEach((character) => {
        if (character) {
          const isDuplicate = this.favoriteCharacters.some((c) => c.id === character.id);
          if (!isDuplicate) {
            this.favoriteCharacters.push(character);
          } else {
            console.warn('Duplicate character found and ignored:', character);
          }
        }
      });

      console.log('Final favorite characters list:', this.favoriteCharacters);
    });
  }

  isFavorite(character: any): boolean {
    return this.favorites.has(character.id);
  }

  toggleFavorite(character: any, event: Event): void {
    event.stopPropagation();
    if (this.favorites.has(character.id)) {
      this.favorites.delete(character.id);
      console.log('Tu personaje ' + character.name + ' fue eliminado de favoritos');
      setTimeout(() => {
        this.favoriteCharacters = this.favoriteCharacters.filter(c => c.id !== character.id);
      }, 500);
    } else {
      this.favorites.add(character.id);
      console.log('Tu personaje ' + character.name + ' fue añadido a favoritos');

      this.dragonBallSvc.getCharacterById(character.id).subscribe({
        next: (newCharacter) => {
          const isDuplicate = this.favoriteCharacters.some(c => c.id === newCharacter.id);
          if (!isDuplicate) {
            this.favoriteCharacters.push(newCharacter);
          }
        },
        error: (error) => {
          console.error('Error fetching character:', error);
        },
      });
    }
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }
}
