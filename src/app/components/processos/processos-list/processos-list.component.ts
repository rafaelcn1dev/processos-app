import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from 'src/app/models/processo';
import { ProcessosService } from 'src/app/services/processos.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-processos-list',
  templateUrl: './processos-list.component.html',
  styleUrls: ['./processos-list.component.css']
})
export class ProcessosListComponent implements OnInit {
  
  processoForm: FormGroup;
  
  ELEMENT_DATA: Processo[] = [];
  
  displayedColumns: string[] = ['npu', 'dataCadastro', 'dataVisualizacao', 'municipio', 'uf', 'documentoPath', 'acoes'];
  dataSource = new MatTableDataSource<Processo>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private service: ProcessosService
  ) { }
  
  ngOnInit(): void {
    this.getAllProcessos();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  getAllProcessos() {
    this.service.getAllProcessos().subscribe(resposta => {
      this.ELEMENT_DATA = resposta.content;
      this.dataSource = new MatTableDataSource<Processo>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  getFileName(path: string): string {
    if (!path) {
      return '';
    }
    return path.split('\\').pop().split('/').pop();
  }
  
  download(id: number, nomeArquivo: string) {
    this.service.download(id).subscribe((response: HttpResponse<Blob>) => {
      const contentDisposition = response.headers.get('Content-Disposition');
      const matches = /filename="([^"]*)"/.exec(contentDisposition);
      const filename = (matches != null && matches[1]) ? matches[1] : nomeArquivo;

      const blob = new Blob([response.body], { type: response.body.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Erro ao baixar o arquivo:', error);
    });
  }
}