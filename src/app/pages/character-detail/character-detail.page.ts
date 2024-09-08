import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DragonBallService } from 'src/app/services/dragon-ball.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],

})
export class CharacterDetailPage implements OnInit {
  characterId:string='';
  character= null as any;
  

  constructor(
    private actRoute:ActivatedRoute,
    private dragonBallSvc: DragonBallService
  ) { 
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
    console.log(this.characterId)
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getCharacter()
  }
  getCharacter() {
   
    this.dragonBallSvc.getCharacterById(this.characterId).subscribe({
      next: (res: any) => {
        this.characterId = res;  
        console.log('Character data:', this.characterId);  
        this.character = res;
      },
      error: (error: any) => {
        console.error('Error fetching character:', error);
      },
    });
  }
}
