import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public showLogin = false;
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  login() {
    // Agrega aquí la lógica para autenticar al usuario
    if (this.email === 'test@example.com' && this.password === 'password123') {
      // Navega a la página principal o a la que desees tras el login exitoso
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('Credenciales incorrectas');
    }
  }
  signUp() {
    // Lógica para el registro de usuario
    console.log('Usuario registrado');
  }
  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}
