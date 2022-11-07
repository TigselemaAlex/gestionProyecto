import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel } from 'src/app/model/form.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() inputs: FormModel[] = [];
  @Input() header: string = '';

  public displayModal: boolean = false;

  public formGroup!: FormGroup;

  constructor(private formService: FormService) {}
  ngOnInit(): void {
    this.createForm();
    this.formService.showForm$.subscribe((toggle) => {
      this.displayModal = toggle;
    });
  }

  createForm(): void {
    const group: any = {};
    this.inputs.forEach((input) => {
      group[input.controlName] = input.require
        ? new FormControl(
            {
              value: input.value || '',
              disabled: input.controlName == 'cedula' && input.value != '',
            },
            Validators.required
          )
        : new FormControl({
            value: input.value || '',
            disabled: input.controlName == 'cedula' && input.value != '',
          });
    });
    this.formGroup = new FormGroup(group);
  }

  onDisplayModal(): void {
    this.formService.toggleForm(false);
  }
  aceptar() {
    console.log(this.formGroup.getRawValue());
    this.formService.sendData({
      save: true,
      data: this.formGroup.getRawValue(),
    });
    this.onDisplayModal();
  }

  validateForm(): boolean {
    return !this.formGroup.valid;
  }
}
