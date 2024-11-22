import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public showLogin = true; 
  email: string = '';
  password: string = '';
  user: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Función de login
  login() {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    // Simula la autenticación (reemplaza con lógica real)
    if (this.email === storedEmail && this.password === storedPassword) {
      // Si los datos coinciden, redirigir a tab1
      localStorage.setItem('userToken', 'dummy_token');
      this.navCtrl.navigateRoot('/tabs/tab1');
    } else {
      this.showAlert('Login Failed', 'Invalid email or password.');
    }
  }

  // Función de registro
  signUp() {
    if (this.email && this.password && this.user) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      this.showAlert('Registration Successful', 'You have been registered successfully.');
      console.log("Usuario registrado:", this.user);
    } else {
      this.showAlert('Registration Failed', 'Please enter valid email and password.');
      console.log("Registro fallido, datos inválidos.");
    }
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  // Muestra un mensaje de alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }



  
}
