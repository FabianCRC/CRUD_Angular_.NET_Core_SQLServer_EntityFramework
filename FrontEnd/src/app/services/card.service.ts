import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private serverURL = 'https://localhost:44328/';
  private apiCardURL = 'api/Card/';

  constructor(private http: HttpClient) { }

  getCardList(): Observable<any> {
    return this.http.get(this.serverURL + this.apiCardURL);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(this.serverURL + this.apiCardURL + id);
  }

  createCard(card: any): Observable<any> {
    return this.http.post(this.serverURL + this.apiCardURL, card);
  }

  updateCard(id: any, card: any): Observable<any> {
    return this.http.put(this.serverURL + this.apiCardURL + id, card);
  }

}
