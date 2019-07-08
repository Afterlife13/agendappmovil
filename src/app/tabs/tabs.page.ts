import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router, private tareasService: TareasService) {
    if ( !localStorage.getItem('tokenNino') ) {
      this.router.navigateByUrl('');
    } else {}
  }

}
