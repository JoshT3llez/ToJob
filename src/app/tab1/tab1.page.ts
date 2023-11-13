import { Component, OnInit,inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  userName: string;

  firebaseSvc = inject(FirebaseService);
utilsSvc = inject(UtilsService);

user(): User {
  return this.utilsSvc.getFromLocalStorage('user');
}

  ngOnInit() {
    // Obtener el nombre de usuario desde el servicio de Firebase
    this.userName = this.firebaseSvc.getUserName();
  }
}
