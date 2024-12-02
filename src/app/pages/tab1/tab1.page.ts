import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPromptComponent } from 'src/app/components/login-prompt/login-prompt.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule],
})
export class Tab1Page implements OnInit {
  characters: any[] = [];
  allCharacters: any[] = [];
  params = { page: 0, name: '' };
  allCharactersLoaded = false;
  loading = false;
  favorites: Set<string> = new Set<string>();

  constructor(
    private dragonBallSvc: DragonBallService,
    private router: Router,
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.params.page = 0;
    this.loadFavorites();
    this.getCharacters();

    window.addEventListener('storage', () => {
      this.loadFavorites();
    });
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  getCharacters(event?: any) {
    if (this.allCharactersLoaded) {
      if (event) event.target.complete();
      return;
    }

    this.loading = true;
    this.params.page += 1;

    this.dragonBallSvc.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.items);
        this.allCharacters.push(...res.items);

        if (res.items.length === 0) {
          this.allCharactersLoaded = true;
        }
        this.loading = false;

        if (event) event.target.complete();
      },
      error: (error: any) => {
        console.error('Error fetching characters:', error);
        this.loading = false;
        if (event) event.target.complete();
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
    });
  }

  goToCharacterDetail(id: string) {
    this.router.navigate(['character-detail', id]);
  }

  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  isFavorite(character: any): boolean {
    return this.favorites.has(character.id.toString());
  }

  async presentAlert(message: string) {
    const modal = await this.modalController.create({
      component: AlertModalComponent,
      componentProps: { message }
    });
    return await modal.present();
  }

  async toggleFavorite(character: any, event: Event): Promise<void> {
    event.stopPropagation();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage

    if (!isLoggedIn) {
      const modal = await this.modalController.create({
        component: LoginPromptComponent
      });
      return await modal.present();
    }

    if (email) { // Verificar que email no sea null
      if (this.favorites.has(character.id.toString())) {
        this.favorites.delete(character.id.toString());
        console.log('Tu personaje ' + character.name + ' fue eliminado de favoritos');

        // Eliminar el favorito de la base de datos
        this.authService.removeFavorite(email, character.id.toString()).subscribe({
          next: (response: any) => {
            console.log('Favorito eliminado de la base de datos:', response);
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

  loadFavorites(): void {
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage
    if (email) {
      this.authService.getFavorites(email).subscribe({
        next: (favorites) => {
          this.favorites = new Set<string>(favorites.map((fav: any) => fav.characterId.toString()));
        },
        error: (error) => {
          console.error('Error fetching favorites:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
