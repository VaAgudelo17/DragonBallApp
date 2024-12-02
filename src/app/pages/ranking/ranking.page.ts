import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  users = [
    { nombre: 'Juan Pérez', usuario: 'juan123', intercambios: 150, personajesCapturados: 200, ranking: 1 },
    { nombre: 'Ana García', usuario: 'ana456', intercambios: 120, personajesCapturados: 180, ranking: 2 },
    { nombre: 'Carlos López', usuario: 'carlos789', intercambios: 100, personajesCapturados: 150, ranking: 3 },
    { nombre: 'María Fernández', usuario: 'maria321', intercambios: 90, personajesCapturados: 130, ranking: 4 },
    { nombre: 'Pedro González', usuario: 'pedro654', intercambios: 80, personajesCapturados: 110, ranking: 5 }
  ];

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
