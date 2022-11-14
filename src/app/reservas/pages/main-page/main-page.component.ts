import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/model/cliente.model';
import { FormModel } from 'src/app/model/form.model';
import { Habitacion } from 'src/app/model/habitacion.model';
import { Reserva } from 'src/app/model/reserva.model';
import { TableMetaData } from 'src/app/model/table-meta-data.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormService } from 'src/app/services/form.service';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  public cols: TableMetaData[] = [
    { header: 'Fecha Entrada', field: 'fechaentrada' },
    { header: 'Fecha Salida', field: 'fechasalida' },
    { header: 'Pago Habitación', field: 'pagohabitacion' },
    { header: 'Cliente', field: 'cliente' },
    { header: 'Habitación', field: 'habitacion' },
    { header: 'Acciones', field: 'acciones' },
  ];
  public reserva: Reserva[] = [];
  public inputs: FormModel[] = [];
  public headerForm: string = 'Nueva Reserva';
  public displayModal: boolean = false;

  private formSubscription!: Subscription;
  constructor(
    private reservaService: ReservaService,
    private formServices: FormService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clienteService: ClienteService,
    private habitacionService: HabitacionService
  ) {}

  ngOnDestroy(): void {
    this.formServices.toggleForm(false);
    this.formServices.sendData({});
    this.formSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getReservas();

    this.loadOptions();
    this.formSubscription = this.formServices.data$.subscribe((data) => {
      if (data?.delete) {
        this.onDeleteReserva(data.id);
      } else if (data?.id) {
        this.onEditarReserva(data.id);
      } else if (data?.save) {
        let reserva: Reserva = data.data;
        reserva = this.transformarEstadoPago(reserva);
        this.onSaveReserva(reserva);
      } else {
        this.loadOptions();
      }
    });
    this.formServices.showForm$.subscribe((toggle) => {
      this.displayModal = toggle;
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
        label: 'Fecha Entrada',
        controlName: 'fechaentrada',
        type: 'calendar',
        require: true,
        value: '',
      },
      {
        label: 'Fecha Salida',
        controlName: 'fechasalida',
        type: 'calendar',
        require: true,
        value: '',
      },
      {
        label: 'Pago Habitacion',
        controlName: 'pagohabitacion',
        type: 'dropdown',
        require: true,
        value: '',
        options: [
          { key: '0', value: 'No' },
          { key: '1', value: 'Si' },
        ],
      },
      {
        label: 'Cliente',
        controlName: 'cliente',
        type: 'dropdown',
        require: true,
        value: '',
        options: [],
      },
      {
        label: 'Habitación',
        controlName: 'habitacion',
        type: 'dropdown',
        require: true,
        value: '',
        options: [],
      },
    ];
  }

  onSaveReserva(reserva: Reserva) {
    if (reserva.id) {
      this.reservaService.editReserva(reserva.id, reserva).subscribe({
        next: (response) => {
          this.getReservas();
          this.showMessage('success', 'Exitosa', 'Reserva actualizada');
        },
      });
    } else {
      console.log('Nueva');
      this.reservaService.addReserva(reserva).subscribe({
        next: (response) => {
          this.getReservas();
          this.showMessage('success', 'Exitosa', 'Reserva creada');
        },
      });
    }
  }
  transformarEstadoPago(reserva: Reserva): Reserva {
    if (reserva.pagohabitacion == '0') {
      reserva.pagohabitacion = false;
    } else {
      reserva.pagohabitacion = true;
    }
    return reserva;
  }
  onEditarReserva(id: any) {
    let reserva: Reserva;

    this.reservaService.getReserva(id).subscribe({
      next: (response) => {
        reserva = response;
        this.inputs.forEach((input) => {
          (Object.keys(reserva) as (keyof typeof reserva)[]).find((key) => {
            if (input.controlName == key) {
              if (input.options) {
                input.value = reserva[key] as string;
              } else {
                if (input.type == 'calendar') {
                  let date = (reserva[key] as string).split('-');
                  input.value = new Date(
                    Number(date[2]),
                    Number(date[1]) - 1,
                    Number(date[0])
                  );
                } else {
                  input.value = reserva[key];
                }
              }
            }
          });
        });
        this.formServices.toggleForm(true);
      },
    });
  }
  onDeleteReserva(id: any) {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar la RESERVA?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-raised p-button-text',
      rejectButtonStyleClass: 'p-button-raised p-button-danger p-button-text',
      accept: () => {
        this.reservaService.deteReserva(id).subscribe({
          next: (response) => {
            this.showMessage('info', 'Confirmado', 'Reserva eliminada');
            this.getReservas();
          },
        });
      },
    });
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe({
      next: (response) => {
        this.reserva = response;
      },
    });
  }

  loadOptions(): void {
    this.createInputs();
    let habitaciones: Habitacion[];
    let clientes: Cliente[];
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        clientes = response;
        let options = clientes.map((c) => {
          return {
            key: c.id.toString(),
            value: `${c.cedula} ${c.nombre} ${c.apellido}`,
          };
        });
        this.inputs.forEach((i) => {
          if (i.controlName == 'cliente') {
            i.options = options;
          }
        });
      },
    });

    this.habitacionService.getHabitaciones().subscribe({
      next: (response) => {
        habitaciones = response;
        let options = habitaciones.map((h) => {
          return { key: h.id.toString(), value: h.numero.toString() };
        });

        this.inputs.forEach((i) => {
          if (i.controlName == 'habitacion') {
            i.options = options;
          }
        });
      },
    });
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 1500,
    });
  }
}
