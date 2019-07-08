import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TareasService } from '../services/tareas.service';
import { NinoModel } from './nino.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

nino: NinoModel = new NinoModel();
fecha: Date = new Date();

  constructor(private router: Router, private tareasService: TareasService) {
   }

  ngOnInit() {
    if (this.fecha.getDay() === 0) {
      localStorage.setItem('dia', String(6));
    } else {
      localStorage.setItem('dia', String(this.fecha.getDay() - 1));
      }

    if ( localStorage.getItem('tokenNino') ) {
      this.router.navigateByUrl('/tabs');
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
     allowOutsideClick: false,
     type: 'info',
     title: 'Espere por favor...'
   });
    Swal.showLoading();

    this.tareasService.login(this.nino)
   .subscribe( resp => {

     Swal.close();

     this.router.navigateByUrl('/tabs');

   }, (err) => {
     Swal.fire({
       type: 'error',
       title: 'Datos incorrectos'
     });
  });
  }

}
