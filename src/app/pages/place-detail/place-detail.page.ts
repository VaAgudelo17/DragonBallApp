import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DragonBallService } from 'src/app/services/dragon-ball.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  placeId: string = '';
  place: any = null;
  characters: any[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private dragonBallSvc: DragonBallService,
    private router: Router
  ) {
    this.placeId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPlace();
  }

  getPlace() {
    this.dragonBallSvc.getPlaceById(this.placeId).subscribe({
      next: (res: any) => {
        this.place = res;
        console.log('Place data:', this.place);
        if (this.place.characters) {
          this.getCharacterByPlaces();  // Llama a esta función una vez que el lugar se ha cargado
        }
      },
      error: (error: any) => {
        console.error('Error fetching place:', error);
      },
    });
  }

  getCharacterByPlaces() {
    // Extraer los personajes directamente del JSON
    this.characters = this.place.characters; 
    console.log('Characters:', this.characters);
  }

  goToCharacterDetail(id: string) {
    this.router.navigate(['character-detail', id]);  
  }
}
