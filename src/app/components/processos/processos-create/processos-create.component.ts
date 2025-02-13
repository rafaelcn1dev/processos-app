import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';
import { ProcessosService } from 'src/app/services/processos.service';
import { Processo } from '../../../models/processo';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-processos-create',
  templateUrl: './processos-create.component.html',
  styleUrls: ['./processos-create.component.css']
})
export class ProcessosCreateComponent implements OnInit {

  processoForm: FormGroup;

  constructor(
    private service: ProcessosService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.processoForm = new FormGroup({
      npu: new FormControl(null, [Validators.required, npuValidator()]),
      municipio: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
      documentoPath: new FormControl(null)
    });
  }

  create(): void {
    if (this.processoForm.valid) {
      const processo: Processo = this.processoForm.value;
      this.service.create(processo).subscribe({
        next: () => {
          this.toastr.success('Processo criado com sucesso!', 'Sucesso');
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
}