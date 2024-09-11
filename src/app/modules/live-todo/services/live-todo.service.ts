import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveTodoModel } from '../models/to-do';

@Injectable({
  providedIn: 'root'
})
export class LiveTodoService {
  apiUrl = environment.baseUrl + 'LiveToDo';
  constructor(private http: HttpClient) {
  }
  GetListLiveToDo(): Observable<LiveTodoModel[]> {
    return this.http.get<LiveTodoModel[]>(`${this.apiUrl}/GetListLiveToDo`);
  }
}
