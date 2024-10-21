import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DragonBallService {
  private apiUrl = 'https://dragonball-api.com/api/characters'; 
  private apiUrl2 = 'https://dragonball-api.com/api/planets'; 
  private favoritesSubject = new BehaviorSubject<Set<string>>(new Set<string>());
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoritesSubject.next(new Set<string>(JSON.parse(storedFavorites)));
    }
  }

  getCharacters(params: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params.page) {
      httpParams = httpParams.set('page', params.page);
    }
    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }

    return this.http.get(this.apiUrl, { params: httpParams });
  }
  
  getPlaces(params: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params.page) {
      httpParams = httpParams.set('page', params.page);
    }
    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }
    return this.http.get(this.apiUrl2, { params: httpParams });
  }

  getCharacterById(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('ID is required to fetch character'));
    }

    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching character by ID:', error);
        return throwError(() => new Error('Error fetching character by ID'));
      })
    );
  }

  getPlaceById(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('ID is required to fetch place'));
    }

    return this.http.get(`${this.apiUrl2}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error fetching place by ID'));
      })
    );
  }

  getByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  toggleFavorite(characterId: string): void {
    const currentFavorites = this.favoritesSubject.value;

    if (currentFavorites.has(characterId)) {
      currentFavorites.delete(characterId); 
    } else {
      currentFavorites.add(characterId);
    }

    this.favoritesSubject.next(new Set<string>(currentFavorites));

    localStorage.setItem('favorites', JSON.stringify(Array.from(currentFavorites)));
  }

  isFavorite(characterId: string): boolean {
    return this.favoritesSubject.value.has(characterId);
  }

  // En DragonBallService


}
