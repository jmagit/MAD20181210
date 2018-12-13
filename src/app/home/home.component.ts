import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationType } from '../common-app/notification.service';
import { LoggerService } from 'src/indra-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Hola Mundo';

  constructor(private notify: NotificationService, private out: LoggerService) {

  }
  ngOnInit() {
    // this.notify.add('Esto es una notificacion de error');
    // this.notify.add('Esto es una notificacion de aviso', NotificationType.warn);
    // this.notify.remove(0);
    // this.notify.add(null);
    // this.notify.remove(0);
    // this.out.error('Esto es un error');
    // this.out.warn('Esto es un warn');
    // this.out.info('Esto es un info');
    // this.out.log('Esto es un log');
  }

}
