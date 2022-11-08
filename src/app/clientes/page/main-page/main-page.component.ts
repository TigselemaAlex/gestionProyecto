import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cliente } from 'src/app/model/cliente.model';
import { FormModel } from 'src/app/model/form.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormService } from 'src/app/services/form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  public cols: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'telefono',
    'acciones',
  ];

  public clientes: Cliente[] = [];

  public displayModal: boolean = false;

  public inputs: FormModel[] = [];
  public headerForm: string = 'Nuevo Cliente';

  private formSubscription!: Subscription;

  constructor(
    private formService: FormService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnDestroy(): void {
    this.formService.sendData({});
    this.formService.toggleForm(false);
    this.formSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.createInputs();
    this.getClientes();

    this.formSubscription = this.formService.data$.subscribe((data) => {
      if (data?.delete) {
        this.onDeleteClinete(data.id);
      } else if (data?.id) {
        this.onEditarCliente(data.id);
      } else if (data?.save) {
        const cliente: Cliente = data.data;
        this.onSaveCliente(cliente);
      } else {
        this.createInputs();
      }
    });
    this.formService.showForm$.subscribe((toggle) => {
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
        label: 'Cédula',
        controlName: 'cedula',
        type: 'text',
        require: true,
        value: '',
      },
      {
        label: 'Nombre',
        controlName: 'nombre',
        type: 'text',
        require: true,
        value: '',
      },
      {
        label: 'Apellido',
        controlName: 'apellido',
        type: 'text',
        require: true,
        value: '',
      },
      {
        label: 'Telefono',
        controlName: 'telefono',
        type: 'text',
        require: true,
        value: '',
      },
    ];
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      },
    });
  }

  onEditarCliente(cedula: any): void {
    console.log(cedula);
    let cliente: Cliente;
    this.clienteService.getClienteById(cedula).subscribe({
      next: (response) => {
        cliente = response;
        this.inputs.forEach((input) => {
          (Object.keys(cliente) as (keyof typeof cliente)[]).find((key) => {
            if (input.controlName == key) {
              input.value = cliente[key];
            }
          });
        });
        this.formService.toggleForm(true);
      },
    });
  }

  onSaveCliente(cliente: Cliente): void {
    if (cliente.id) {
      this.editarCliente(cliente);
    } else {
      console.log(cliente);
      this.addCliente(cliente);
    }
  }

  onDeleteClinete(id: any): void {
    this.confirmationService.confirm({
      message: '¿Seguro que desea eliminar al CLIENTE?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-raised p-button-text',
      rejectButtonStyleClass: 'p-button-raised p-button-danger p-button-text',
      accept: () => {
        this.clienteService.eliminarCliente(id).subscribe({
          next: (response) => {
            this.showMessage('info', 'Confirmado', 'Cliente eliminado');
            this.getClientes();
          },
        });
      },
    });
  }

  addCliente(cliente: Cliente): void {
    this.clienteService.addCliente(cliente).subscribe({
      next: (response) => {
        this.getClientes();
        this.showMessage('success', 'Exitoso', 'Cliente guardado');
      },
      error: (err) => {
        this.showMessage('error', 'Error', 'Error al guardar el cliente');
      },
    });
  }

  editarCliente(cliente: Cliente): void {
    this.clienteService.editarCliente(cliente.id, cliente).subscribe({
      next: (response) => {
        this.getClientes();
        this.showMessage('success', 'Exitoso', 'Cliente actualizado');
      },
      error: (err) => {
        this.showMessage('error', 'Error', 'Error al actualizar el cliente');
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
