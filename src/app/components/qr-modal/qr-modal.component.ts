import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss'],
})
export class QrModalComponent {
  @Input() qrData: string = '';

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss().then(() => {
      window.location.reload();
    });
  }
}
