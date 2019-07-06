import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  tareas: any = [];
  dias: any = [];
  idnino: number;
  dia: number;
  token: number;
  fecha: Date = new Date();

  constructor(private tareasService: TareasService, private router: Router) {}

  ngOnInit() {
    if ( localStorage.getItem('tokenNino') ) {
      this.token = +localStorage.getItem('tokenNino');
    }

    if (this.fecha.getDay() === 0) {
      this.dia = 6;
    } else {
    this.dia = (this.fecha.getDay() - 1);
    }
    this.tareasService.getDiasActiva(this.token).subscribe(
      resp => {
        this.dias = resp;
        this.tareasService.getTareasManana(this.dias[this.dia].iddia).subscribe(
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

cargarTareasManana(id: number) {
  this.tareas = [];
  document.querySelector('ion-menu-controller')
  .close();
  this.tareasService.getTareasManana(id).subscribe(
    resp => {
      this.tareas = resp;
    });
}

logout() {
localStorage.removeItem('tokenNino');
this.router.navigateByUrl('');
}

sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

}
