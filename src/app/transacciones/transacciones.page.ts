import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.page.html',
  styleUrls: ['./transacciones.page.scss'],
})
export class TransaccionesPage implements OnInit {

  public transacciones: any = []; //Cargar Llamadas

  constructor(private authService: AuthService) {
    this.loadAll();
   }

  ngOnInit() {
  }

  loadAll(){
    this.authService.historial().subscribe(result => {
      this.transacciones = result.transacciones;
      this.filterCartera();
    });
  }

  filterCartera(){
    this.transacciones.forEach(element => {
      element.receptor = this.cifrarCartera(element);
    });
  }

  cifrarCartera(element){
    const hash = CryptoJS.SHA256(element).toString(CryptoJS.enc.Hex).substr(0,16);
    console.log(hash);
    return hash;
  }

  stringGen(len) {
    let text = '';
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < len; i++){
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loadAll();
    setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
    }, 2000);
}

}
