import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as L from 'leaflet';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { ModalController } from '@ionic/angular';
import { LoginPromptComponent } from 'src/app/components/login-prompt/login-prompt.component';
import { AuthService } from 'src/app/services/auth.service';
import { SuccessModalComponent } from 'src/app/components/succes-modal/success-modal.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  map: L.Map | undefined;
  currentLocationMarker: L.Marker | undefined;
  villains: any[] = [];

  constructor(
    private geolocation: Geolocation,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private dragonBallSvc: DragonBallService,
    private modalController: ModalController,
    private authService: AuthService
  ) {
    const accessedFromButton = sessionStorage.getItem('accessedFromButton');
  }

  ngOnInit() {
    this.checkLoginStatus();
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
    this.loadMap();
  }

  loadMap() {
    // Verifica los permisos de ubicación
    this.geolocation.getCurrentPosition().then((resp) => {
      if ('coords' in resp) {
        // Crear el mapa y centrarlo en la ubicación del usuario
        this.map = L.map('mapId').setView([resp.coords.latitude, resp.coords.longitude], 10); // Ajusta el nivel de zoom aquí

        // Cambia el tile layer a uno más común si el anterior presenta problemas
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19, // Limitar el máximo de zoom
          minZoom: 5,   // Establecer un mínimo de zoom
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // Crea un ícono personalizado
        const icon = L.icon({
          iconUrl: 'assets/img/gohan.png',
          iconSize: [40, 40], // Hacer el icono más pequeño
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });

        // Crea un marcador en la ubicación actual
        this.currentLocationMarker = L.marker([resp.coords.latitude, resp.coords.longitude], { icon: icon })
          .addTo(this.map)
          .bindPopup('Estás aquí')
          .openPopup();

        // Inicia la vigilancia de la posición
        this.watchPosition();
      }
    }).catch((error) => {
      console.error('Error obteniendo la localización', error);
      alert('No se pudo obtener la ubicación. Asegúrate de que los permisos de ubicación estén habilitados.');
    });
  }

  watchPosition() {
    this.geolocation.watchPosition().subscribe((data) => {
      if (data && 'coords' in data) {
        this.currentLocationMarker?.setLatLng([data.coords.latitude, data.coords.longitude]);
      }
    }, (error) => {
      console.log('Error al vigilar la localización', error);
    });
  }

  goToVillains() {
    this.router.navigate(['villains']);
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Datos del QR escaneado:', barcodeData);

      if (!barcodeData.cancelled) {
        const scannedUrl = barcodeData.text;
        console.log('URL escaneada:', scannedUrl);

        if (scannedUrl.includes('/character-detail/')) {
          const characterId = scannedUrl.split('/character-detail/')[1];
          console.log('ID del personaje:', characterId);

          // Guardar el villano escaneado en la base de datos
          this.saveVillainToDatabase(characterId);
        } else {
          console.error('La URL escaneada no es válida para detalles del personaje');
        }
      }
    }).catch(err => {
      console.error('Error al escanear el QR:', err);
    });
  }

  // Método que navega al detalle del personaje, igual que en 'tab1'
  goToCharacterDetail(id: string) {
    console.log('Navegando a character-detail con ID:', id); // Verifica si el método de navegación se llama correctamente
    this.router.navigate(['character-detail', id]);
  }

  async saveVillainToDatabase(characterId: string) {
    const email = localStorage.getItem('userEmail'); // Obtener el correo electrónico del usuario desde localStorage
    if (email) {
      this.authService.addVillain(email, characterId).subscribe({
        next: async (response) => {
          console.log('Villano guardado en la base de datos:', response);
          const { previousUser } = response;
          const previousUserName = previousUser ? previousUser.username : 'Alguien';

          // Obtener el nombre del personaje
          const character = await this.dragonBallSvc.getCharacterById(characterId).toPromise();
          const characterName = character.name;

          // Mostrar el modal de éxito con el mensaje personalizado
          const modal = await this.modalController.create({
            component: SuccessModalComponent,
            componentProps: {
              message: `${previousUserName} te transfirió ${characterName}`
            }
          });
          await modal.present();
          // Navegar al detalle del personaje después de mostrar el modal
          this.goToCharacterDetail(characterId);
        },
        error: (error) => {
          console.error('Error al guardar el villano en la base de datos:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el correo electrónico del usuario.');
    }
  }
}
