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
  
  getProcessoById(id: any): Observable<ProcessoResponse> {
    return this.http.get<ProcessoResponse>(`${this.baseUrl}/processos/${id}`);
  }
  
  create(processo: Processo): Observable<Processo> {
    const formData = new FormData();
    formData.append('npu', processo.npu);
    formData.append('municipio', processo.municipio);
    formData.append('uf', processo.uf);
    if (processo.documentoPath) {
      formData.append('documentoPath', processo.documentoPath);
    }
    return this.http.post<Processo>(`${this.baseUrl}/processos`, formData);
  }
  
  atualizar(processo: Processo): Observable<Processo> {
    const formData = new FormData();
    formData.append('npu', processo.npu);
    formData.append('municipio', processo.municipio);
    formData.append('uf', processo.uf);
    if (processo.documentoPath) {
      formData.append('documentoPath', processo.documentoPath);
    }
    return this.http.put<Processo>(`${this.baseUrl}/processos/${processo.id}`, formData);
  }
  
}
