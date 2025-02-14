import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { ProcessosService } from 'src/app/services/processos.service';
import { Processo } from '../../../models/processo';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-processos-update',
  templateUrl: './processos-update.component.html',
  styleUrls: ['./processos-update.component.css']
})
export class ProcessosUpdateComponent implements OnInit {

  ufs: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

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
      npu: new FormControl(null, [Validators.required, npuValidator()]),
      municipio: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
      documentoPath: new FormControl(null)
    });
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.processoForm.patchValue({ id: id });
      this.getProcessoById(id);
    }
  }

  atualizar(): void {
    if (this.processoForm.valid) {
      const processo: Processo = this.processoForm.value;
      this.service.atualizar(processo).subscribe({
        next: () => {
          this.toastr.success('Processo atualizado com sucesso!', 'Sucesso');
          this.router.navigate(['processos']);
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
  
  getProcessoById(id: string): void {
    this.service.getProcessoById(id).subscribe(resposta => {
      this.processoForm.patchValue(resposta);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.processoForm.patchValue({ documentoPath: file });
      console.log('Arquivo selecionado:', file);
    }
  }

  get npu() { return this.processoForm.get('npu'); }
  get municipio() { return this.processoForm.get('municipio'); }
  get uf() { return this.processoForm.get('uf'); }
  
}

export function npuValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[0-9]{7}-[0-9]{2}\.[0-9]{4}\.[0-9]\.[0-9]{2}\.[0-9]{4}$/.test(control.value);
    return valid ? null : { invalidNpu: true };
  };
} {

}
