import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DragonBallService {
  private apiUrl = 'https://dragonball-api.com/api/characters'; 
  private apiUrl2 = 'https://dragonball-api.com/api/planets'; 

  constructor(private http: HttpClient) {}

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
  
  getPlaces (params: any):Observable<any>{
    let httpParams = new HttpParams();
    if (params.page) {
      httpParams = httpParams.set('page', params.page);
    }
    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }
    return this.http.get(this.apiUrl2, { params: httpParams });
  }

  getCharacterById (id:string){
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

  getPlaceById (id:string){
    if (!id) {
      return throwError(() => new Error('ID is required to fetch place'));
    }

    return this.http.get(`${this.apiUrl2}/${id}`).pipe(
      catchError((error) => {

        return throwError(() => new Error('Error fetching character by ID'));
      })
    );
  }
  getByUrl(url:string){
    return this.http.get(url)

  }


  

}
