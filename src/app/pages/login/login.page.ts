import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController
  ) {}

  async presentAlert(message: string) {
    const modal = await this.modalController.create({
      component: AlertModalComponent,
      componentProps: { message }
    });
    return await modal.present();
  }

  async signUp() {
    if (!this.user || !this.email || !this.password) {
      await this.presentAlert('Todos los campos son obligatorios.');
      return;
    }

    const user = { username: this.user, email: this.email, password: this.password };
    this.authService.signUp(user).subscribe(
      async response => {
        console.log('User registered successfully', response);
        await this.presentAlert('Registro exitoso.');
        this.router.navigate(['/tabs/tab1']);
      },
      async error => {
        console.error('Error registering user', error);
        if (error.status === 400 && error.error.message.includes('unique constraint')) {
          await this.presentAlert('El correo o nombre de usuario ya existe.');
        } else {
          await this.presentAlert('Error al registrar el usuario.');
        }
      }
    );
  }

  async login() {
    if (!this.email || !this.password) {
      await this.presentAlert('Todos los campos son obligatorios.');
      return;
    }

    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      async response => {
        console.log('User logged in successfully', response);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', this.email);
        this.router.navigate(['/tabs/tab1']);
      },
      async error => {
        console.error('Error logging in', error);
        await this.presentAlert('Error al iniciar sesión.');
      }
    );
  }
}
