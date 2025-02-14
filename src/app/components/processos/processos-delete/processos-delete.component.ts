import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { ProcessosService } from 'src/app/services/processos.service';
import { Processo } from '../../../models/processo';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-processos-delete',
  templateUrl: './processos-delete.component.html',
  styleUrls: ['./processos-delete.component.css']
})
export class ProcessosDeleteComponent implements OnInit {

  processo: Processo;
  processoForm: FormGroup;

  constructor(
    private service: ProcessosService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    
    
    this.processoForm = new FormGroup({
      id: new FormControl(null),
      npu: new FormControl(null),
      municipio: new FormControl(null),
      uf: new FormControl(null)
    });
    
    this.processoForm.get('npu')?.disable();
    this.processoForm.get('municipio')?.disable();
    this.processoForm.get('uf')?.disable();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.processoForm.patchValue({ id: id });
      this.getProcessoById(id);
    }
  }

  deletar(): void {
    if (this.processoForm.valid) {
      const processo: Processo = this.processoForm.value;
      this.service.deletar(processo.id).subscribe({
        next: () => {
          console.log('Redirecionando para a rota processos'); // Adicione este log para depuração
          this.router.navigate(['/processos']);
        },
        error: (ex) => {
          console.error(ex);
          if (ex.error.errors) {
            ex.error.errors.forEach((error: any) => {
              this.toastr.error(error.message, 'Erro');
            });
          } else {
            this.toastr.error(ex.message, 'Erro');
          }
        }
      });
    }
  }
  /*deletar(): void {
    const processo: Processo = this.processoForm.value;
    console.log("Deletado");
    console.log(processo.id)
    this.service.deletar(processo.id).subscribe(() => {
      this.toastr.success('Processo deletado com sucesso!', 'Sucesso');
      this.router.navigate(['/processos']);   
    });
    
    
  }*/
  
  
  getProcessoById(id: string): void {
    this.service.getProcessoById(id).subscribe(resposta => {
      this.processoForm.patchValue(resposta);
    });
  }

  get npu() { return this.processoForm.get('npu'); }
  get municipio() { return this.processoForm.get('municipio'); }
  get uf() { return this.processoForm.get('uf'); }
  
}