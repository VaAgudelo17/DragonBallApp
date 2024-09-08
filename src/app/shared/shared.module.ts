import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonBallService } from '../services/dragon-ball.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[DragonBallService]
})
export class SharedModule { }
