import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { IntroPageRoutingModule } from './intro-routing.module';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(() =>{
      this.router.navigateByUrl('/tabs/tab1')
    },1500);
  }

}
