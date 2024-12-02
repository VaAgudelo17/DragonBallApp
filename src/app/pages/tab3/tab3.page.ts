import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { LoginPromptComponent } from 'src/app/components/login-prompt/login-prompt.component';
import { AuthService } from 'src/app/services/auth.service';

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
    private modalController: ModalController,
    private authService: AuthService
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
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage
    if (email) {
      this.authService.getFavorites(email).subscribe({
        next: (favorites) => {
          this.favorites = new Set<string>(favorites.map((fav: any) => fav.characterId));
          this.getFavoriteCharacters();
        },
        error: (error) => {
          console.error('Error fetching favorites:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
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
    return this.favorites.has(character.id.toString());
  }

  toggleFavorite(character: any, event: Event): void {
    event.stopPropagation();
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage

    if (email) {
      if (this.favorites.has(character.id.toString())) {
        this.favorites.delete(character.id.toString());
        console.log('Tu personaje ' + character.name + ' fue eliminado de favoritos');

        // Eliminar el favorito de la base de datos
        this.authService.removeFavorite(email, character.id.toString()).subscribe({
          next: (response: any) => {
            console.log('Favorito eliminado de la base de datos:', response);
            this.favoriteCharacters = this.favoriteCharacters.filter(c => c.id !== character.id);
          },
          error: (error: any) => {
            console.error('Error al eliminar el favorito de la base de datos:', error);
          }
        });
      } else {
        this.favorites.add(character.id.toString());
        console.log('Tu personaje ' + character.name + ' fue añadido a favoritos');

        // Guardar el favorito en la base de datos
        this.authService.addFavorite(email, character.id.toString()).subscribe({
          next: (response) => {
            console.log('Favorito guardado en la base de datos:', response);
            this.favoriteCharacters.push(character);
          },
          error: (error) => {
            console.error('Error al guardar el favorito en la base de datos:', error);
          }
        });
      }

      localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
    }
  }
}
