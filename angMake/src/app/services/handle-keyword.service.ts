import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleKeywordService {

  constructor(private http: HttpClient) { }

  sendString(stringCheck: string): Observable<any> {
    console.log('Service String',stringCheck)
    const stringData = new FormData();
    stringData.append("title", stringCheck);

    // return this.http.post('http://localhost:3200/api/keywords/', stringData)
    return this.http.post('api/keywords/', stringData)

  }
}
