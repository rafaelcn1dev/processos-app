import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../models/processo';
import { Observable } from 'rxjs';
import { ProcessoResponse } from '../models/processoresponse';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {
  
  baseUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }
  
  getAllProcessos(): Observable<ProcessoResponse> {
    return this.http.get<ProcessoResponse>(`${this.baseUrl}/processos`);
  }
  
}
