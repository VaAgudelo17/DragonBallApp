import { Component, OnInit } from '@angular/core';
import { DragonBallService } from 'src/app/services/dragon-ball.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.page.html',
  styleUrls: ['./villains.page.scss'],
})
export class VillainsPage implements OnInit {
  capturedVillains: any[] = [];

  constructor(private dragonBallSvc: DragonBallService) {}

  ngOnInit() {
    this.loadCapturedVillains();
  }

  // Cargar villanos guardados desde localStorage
  loadCapturedVillains() {
    const villainIds = JSON.parse(localStorage.getItem('villains') || '[]');
    console.log('IDs de villanos guardados:', villainIds); // Log para verificar los IDs

    if (villainIds.length === 0) {
      console.log('No hay villanos capturados en localStorage.');
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
  }
}
