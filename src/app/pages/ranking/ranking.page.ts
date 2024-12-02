import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  users: any[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadUserStats();
  }

  loadUserStats() {
    this.statsService.getUserStats().subscribe({
      next: (stats: any) => {
        this.users = stats.map((stat: any, index: number) => ({
          nombre: stat.User.username,
          usuario: stat.User.email,
          intercambios: stat.exchangedCount,
          personajesCapturados: stat.capturedCount,
          ranking: index + 1
        }));
      },
      error: (error: any) => {
        console.error('Error fetching user stats:', error);
      }
    });
  }
}
