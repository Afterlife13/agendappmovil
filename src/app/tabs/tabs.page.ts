import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {
    if ( !localStorage.getItem('tokenNino') ) {
      this.router.navigateByUrl('');
    } else {
      console.log(localStorage.getItem('tokenNino'));
    }
  }

}
