import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Enviar Ucacoin', url: 'send', icon: 'swap-horizontal' },
    { title: 'Historial', url: 'transacciones', icon: 'analytics' }
    //{ title: 'Mi Perfil', url: 'perfil', icon: 'person' }
  ];

  public footerPages = [
    { title: 'Cerrar Sesión', url: '/login', icon: 'exit' },
  ];

  constructor(private platform: Platform, public router: Router, private authService: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(()=> {
      this.router.navigateByUrl('splash');
    });
  }

  onLogOut(){
    this.authService.logout().then(data => {
      //console.log(data);
    });
    this.router.navigateByUrl('login');
  }
}
