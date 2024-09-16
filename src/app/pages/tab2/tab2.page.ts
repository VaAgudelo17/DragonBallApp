import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DragonBallService } from 'src/app/services/dragon-ball.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class Tab2Page implements OnInit{
  places: any[] = [];
  allPlaces: any[] = []; 
  params = { page: 0, name: '' };
  allPlacesLoaded = false;

  constructor(private dragonBallSvc: DragonBallService, private router: Router) {}
  ngOnInit() {
    this.params.page = 0;
    this.getPlaces();
    
  }
  getPlaces(event?: any) {
    if (this.allPlacesLoaded) {
      if (event) event.target.complete();
      return;
    }

    this.params.page += 1;
    this.dragonBallSvc.getPlaces(this.params).subscribe({
      next: (res: any) => {
        this.places.push(...res.items);
        this.allPlaces.push(...res.items); 
        console.log(this.places);

        if (res.items.length === 0) {
          this.allPlacesLoaded = true;
        }

        if (event) event.target.complete();
      },
      error: (error: any) => {
        if (event) event.target.complete();
        console.error('Error fetching characters:', error);
      },
    });
  }
  searchPlaces(event?: any) {
  
    if (!this.params.name) {
      this.places = this.allPlaces; 
      if (event) event.target.complete();
      return;
    }
    this.params.page = 0;
    this.places = this.allPlaces.filter((places: any) => {
      return places.name.toLowerCase().includes(this.params.name.toLowerCase());

    }
    );
  
}
goToPlaceDetail(id: string) {
  this.router.navigate(['place-detail', id]);  
}
addFavoriteCharacter(){
  console.log('Add to favorite');
}


  


}
