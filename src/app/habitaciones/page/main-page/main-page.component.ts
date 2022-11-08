import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FormModel } from 'src/app/model/form.model';
import { Habitacion } from 'src/app/model/habitacion.model';
import { FormService } from 'src/app/services/form.service';
import { HabitacionService } from 'src/app/services/habitacion.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  public cols: string[] = ['numero', 'estado', 'tipo', 'precio', 'acciones'];
  public habitaciones: Habitacion[] = [];
  public inputs: FormModel[] = [];
  public headerForm: string = 'Nueva Habitación';
  public displayModal: boolean = false;

  private formSubscription!: Subscription;

  constructor(
    private habitacionService: HabitacionService,
    private formServices: FormService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnDestroy(): void {
    this.formServices.toggleForm(false);
    this.formServices.sendData({});
    this.formSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getHabitaciones();
    this.createInputs();

    this.formSubscription = this.formServices.data$.subscribe((data) => {
      if (data?.delete) {
        this.onDeleteHabitacion(data.id);
      } else if (data?.id) {
        this.onEditarHabitacion(data.id);
      } else if (data?.save) {
        let habitacion: Habitacion = data.data;
        habitacion = this.transformarEstado(habitacion);
        this.onSaveHabitacion(habitacion);
      } else {
        this.createInputs();
      }
    });

    this.formServices.showForm$.subscribe((toggle) => {
      this.displayModal = toggle;
    });
  }
  onDeleteHabitacion(id: any) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar la HABITACION?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-raised p-button-text',
      rejectButtonStyleClass: 'p-button-raised p-button-danger p-button-text',
      accept: () => {
        this.habitacionService.deleteHabitacion(id).subscribe({
          next: (response) => {
            this.showMessage('info', 'Confirmado', 'Habtiación eliminada');
            this.getHabitaciones();
          },
        });
      },
    });
  }

  getHabitaciones(): void {
    this.habitacionService.getHabitaciones().subscribe({
      next: (response) => {
        this.habitaciones = response;
      },
    });
  }

  createInputs() {
    this.inputs = [
      {
        label: 'Id',
        controlName: 'id',
        type: 'text',
        require: false,
        value: '',
      },
      {
        label: 'Número Habitación',
        controlName: 'numero',
        type: 'text',
        require: true,
        value: '',
      },
      {
        label: 'Estado',
        controlName: 'estado',
        type: 'dropdown',
        require: true,
        value: '',
        options: [
          { key: 'ocupado', value: 'OCUPADO' },
          { key: 'disponible', value: 'DISPONIBLE' },
        ],
      },
      {
        label: 'Tipo',
        controlName: 'tipo',
        type: 'dropdown',
        require: true,
        value: '',
        options: [
          { key: 'ejecutiva', value: 'EJECUTIVA' },
          { key: 'vip', value: 'VIP' },
          { key: 'matrimonial', value: 'MATRIMONIAL' },
        ],
      },
      {
        label: 'Precio',
        controlName: 'precio',
        type: 'number',
        require: true,
        value: '',
      },
    ];
  }

  onEditarHabitacion(id: any): void {
    let habitacion: Habitacion;
    this.habitacionService.getHabitacionById(id).subscribe({
      next: (response) => {
        habitacion = response;
        this.inputs.forEach((input) => {
          (Object.keys(habitacion) as (keyof typeof habitacion)[]).find(
            (key) => {
              if (input.controlName == key) {
                if (input.options) {
                  input.value = (habitacion[key] as string).toLowerCase();
                } else {
                  input.value = habitacion[key];
                }
              }
            }
          );
        });
        this.formServices.toggleForm(true);
      },
    });
  }

  onSaveHabitacion(habitacion: Habitacion): void {
    if (habitacion.id) {
      this.habitacionService
        .editHabitacion(habitacion.id, habitacion)
        .subscribe({
          next: (response) => {
            this.getHabitaciones();
            this.showMessage('success', 'Exito', 'Habitacion actualizada');
          },
        });
    } else {
      this.habitacionService.addHabitacion(habitacion).subscribe({
        next: (response) => {
          this.getHabitaciones();
          this.showMessage('success', 'Exito', 'Habitacion creada');
        },
      });
    }
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 1500,
    });
  }

  private transformarEstado(habitacion: Habitacion): Habitacion {
    if (habitacion.estado == 'ocupado') {
      habitacion.estado = false;
    } else {
      habitacion.estado = true;
    }
    return habitacion;
  }
}
