import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dragonback-production.up.railway.app'; // Cambia esto si tu backend está en otra URL

  constructor(private http: HttpClient) {}

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  addFavorite(email: string, characterId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, { email, characterId });
  }

  removeFavorite(email: string, characterId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites`, { body: { email, characterId } });
  }

  getFavorites(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites/${email}`);
  }

  addVillain(email: string, characterId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/villains`, { email, characterId });
  }

  getVillains(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/villains/${email}`);
  }
}
