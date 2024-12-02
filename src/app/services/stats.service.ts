import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'https://dragonback-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getUserStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-stats`);
  }

  incrementCapturedCount(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-stats/increment-captured`, { userId });
  }

  incrementExchangedCount(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-stats/increment-exchanged`, { userId });
  }
}
