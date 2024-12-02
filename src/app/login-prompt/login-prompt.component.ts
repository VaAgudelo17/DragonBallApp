import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.scss'],
})
export class LoginPromptComponent {
  constructor(private modalController: ModalController, private router: Router) {}

  redirectToLogin() {
    this.modalController.dismiss();
    this.router.navigate(['/login']);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
