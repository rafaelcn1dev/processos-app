import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from 'src/app/models/processo';
import { ProcessoResponse } from 'src/app/models/processoresponse';
import { ProcessosService } from 'src/app/services/processos.service';

@Component({
  selector: 'app-processos-list',
  templateUrl: './processos-list.component.html',
  styleUrls: ['./processos-list.component.css']
})
export class ProcessosListComponent implements OnInit {
  
  ELEMENT_DATA: Processo[] = [];
  
  displayedColumns: string[] = ['npu', 'dataCadastro', 'dataVisualizacao', 'municipio', 'uf', 'documentoPath'];
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
}