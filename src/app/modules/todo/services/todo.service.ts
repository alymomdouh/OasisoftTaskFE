import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateToDo, ListToDo } from '../models/to-do';
import { GenericPageResult } from '../../shared/models/page-result';
import { AccountService } from '../../auth/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = environment.baseUrl + 'ToDo';
  constructor(
    private accountService: AccountService,
    private http: HttpClient) {
  }
  Create(item: CreateToDo): Observable<ListToDo> {
    item.userId = this.accountService.getUserId();
    return this.http.post<ListToDo>(`${this.apiUrl}/Create`, item);
  }
  GetAll(page: number, pageSize: number): Observable<GenericPageResult<ListToDo>> {
    return this.http.get<GenericPageResult<ListToDo>>(`${this.apiUrl}/GetAll?page=${page}&pageSize=${pageSize}`);
  }
  GetById(id: string): Observable<ListToDo> {
    return this.http.get<ListToDo>(`${this.apiUrl}/GetById?id=${id}`);
  }

  Update(id: number, item: CreateToDo): Observable<ListToDo> {
    item.userId = this.accountService.getUserId();
    return this.http.put<ListToDo>(`${this.apiUrl}/Update?id=${id}`, item);
  }

  Delete(id: number) {
    return this.http.delete(`${this.apiUrl}/Delete?id=${id}`);
  }
  GetList(): Observable<ListToDo[]> {
    return this.http.get<ListToDo[]>(`${this.apiUrl}/GetList`);
  }
}
