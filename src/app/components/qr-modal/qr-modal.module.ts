import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QrModalComponent } from './qr-modal.component';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
  declarations: [QrModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    QRCodeComponent
  ],
  exports: [QrModalComponent]
})
export class QrModalModule {}
