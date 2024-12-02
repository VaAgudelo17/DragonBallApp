import { Component, OnInit } from '@angular/core';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { QrModalComponent } from 'src/app/components/qr-modal/qr-modal.component';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.page.html',
  styleUrls: ['./villains.page.scss'],
})
export class VillainsPage implements OnInit {
  capturedVillains: any[] = [];
  villainId: string = '';

  constructor(
    private dragonBallSvc: DragonBallService,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadCapturedVillains();
  }

  // Cargar villanos guardados desde la base de datos
  loadCapturedVillains() {
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage
    if (email) {
      this.authService.getVillains(email).subscribe({
        next: (villains) => {
          const villainIds = villains.map((villain: any) => villain.characterId);
          console.log('IDs de villanos guardados:', villainIds); // Log para verificar los IDs

          if (villainIds.length === 0) {
            console.log('No hay villanos capturados en la base de datos.');
            return;
          }

          villainIds.forEach((id: string) => {
            this.dragonBallSvc.getCharacterById(id).subscribe({
              next: (res: any) => {
                this.capturedVillains.push(res);
                console.log('Villano cargado:', res); // Log para verificar que se carga cada villano
              },
              error: (err: any) => {
                console.error('Error al cargar el villano', err);
              }
            });
          });
        },
        error: (error) => {
          console.error('Error fetching villains:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
    }
  }

  // Agregar villano manualmente
  addVillain() {
    if (!this.villainId) {
      console.error('ID del villano no puede estar vacío.');
      return;
    }

    this.dragonBallSvc.getCharacterById(this.villainId).subscribe({
      next: (res: any) => {
        this.capturedVillains.push(res);
        console.log('Villano agregado:', res); // Log para verificar que se agrega el villano

        // Guardar el villano en la base de datos
        this.saveVillainToDatabase(this.villainId);

        // Limpiar el campo de entrada
        this.villainId = '';
      },
      error: (err: any) => {
        console.error('Error al agregar el villano', err);
      }
    });
  }

  saveVillainToDatabase(characterId: string) {
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage
    if (email) {
      this.authService.addVillain(email, characterId).subscribe({
        next: (response) => {
          console.log('Villano guardado en la base de datos:', response);
        },
        error: (error) => {
          console.error('Error al guardar el villano en la base de datos:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
    }
  }

  // Transferir villano
  async transferVillain(characterId: string) {
    const qrData = `/character-detail/${characterId}`;
    const modal = await this.modalController.create({
      component: QrModalComponent,
      componentProps: { qrData }
    });
    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'closed') {
      this.loadCapturedVillains();
    }
  }
}
