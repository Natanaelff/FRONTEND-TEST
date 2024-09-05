import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  form: FormGroup;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      cep: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      logradouro: new FormControl('', Validators.required),
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

  ngOnInit(): void { }

  buscarCep() {
    const cepControl = this.form.get('cep');
    const logradouroControl = this.form.get('logradouro');

    if (cepControl && logradouroControl) {
      const cep = cepControl.value?.trim();
      if (cep.length === 8) {
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((response: any) => {
          if (response.logradouro) {
            logradouroControl.setValue(response.logradouro);
          }
        });
      }
    }
  }


  async onSubmit() {
    if (this.form.invalid) {
      alert('Formulário inválido');
      return;
    }

    console.log('onSubmit:', this.form.value);
    this.dialogRef.close(this.form.value);
  }

}

