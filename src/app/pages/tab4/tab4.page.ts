import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  map: L.Map | undefined;
  currentLocationMarker: L.Marker | undefined;

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      if ('coords' in resp) {
        this.map = L.map('mapId').setView([resp.coords.latitude, resp.coords.longitude], 15);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 20,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(this.map);


        const icon = L.icon({
          iconUrl: 'assets/img/gohan.png', 
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        });

        this.currentLocationMarker = L.marker([resp.coords.latitude, resp.coords.longitude], { icon: icon })
          .addTo(this.map)
          .bindPopup('Estás aquí')
          .openPopup();

        this.watchPosition();
      }
    }).catch((error) => {
      console.log('Error obteniendo la localización', error);
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
}
