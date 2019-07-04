import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  tareas: any = [];
  dias: any = [];
  idnino: number;
  dia: number;
  fecha: Date = new Date();

  constructor(private tareasService: TareasService) {}
  ngOnInit() {
    if (this.fecha.getDay() === 0) {
      this.dia = 6;
    } else {
    this.dia = (this.fecha.getDay() - 1);
    }
    this.tareasService.getDiasActiva(19).subscribe(
      resp => {
        this.dias = resp;
        this.tareasService.getTareasNoche(this.dias[this.dia].iddia).subscribe(
           resp2 => {
            this.tareas = resp2;
          },
        );
      },
    );
  }

  async completar(id: number) {

  Swal.fire({
    allowOutsideClick: false,
    type: 'info',
    title: 'Completando tarea'
  });
  this.tareasService.completar(id).subscribe( async resp => {

    Swal.close();
    Swal.fire({
        type: 'success',
        title: 'Muy bien, tarea completada!',
        timer: 1500
      });

    await this.sleep(1500);
    window.location.reload();
  });

}

async marcarPendiente(id: number, estado: string) {
  if (estado !== 'completada') {
    return;
  }
  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Quieres volver a poner esta tarea en pendientes?`,
    type: 'question',
    showConfirmButton: true,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'ACEPTAR',
    cancelButtonText: 'CANCELAR'
  }).then( async resp => {
    if ( resp.value ) {
      this.tareasService.marcarPendiente(id).subscribe( async resp2 => {
        await this.sleep(1500);
        window.location.reload();
      });
    }
  });

}

cargarTareasNoche(id: number) {
  this.tareas = [];
  document.querySelector('ion-menu-controller')
  .close();
  this.tareasService.getTareasNoche(id).subscribe(
    resp => {
      this.tareas = resp;
    });
}

sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
}
