import { AuthService } from '../servicios/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})

export class SendPage implements OnInit, AfterViewInit {

  @ViewChild('balanzazo') inputBalance: ElementRef;
  credentials: FormGroup;
  balance: any;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
    public menuCtrl: MenuController,
    private renderer: Renderer2
	) {

  }

  ngAfterViewInit(){
    //this.renderer.setAttribute(this.inputBalance.nativeElement, 'innerHTML','HOLAA');
  }
  ngOnInit() {
    this.loadForm();
  }

  loadForm(){
    this.getDataBalance();
    console.log(this.balance);
    this.credentials = this.fb.group({
			receptor: ['', [Validators.required]],
			cantidad: [0, [Validators.required, Validators.min(0)]],
      token:['']
		});
  }

  getDataBalance() {
    this.authService.balance().subscribe(balance => {
        this.balance = balance.balance;
    });
}

  async send(){
    const loading = await this.loadingController.create();
		await loading.present();

		this.authService.send(this.credentials.value).subscribe(
			async (res) => {
        console.log(res);
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Éxito',
          message: 'Ucacoin enviada',
					buttons: ['OK']
				});
        alert.present();
			},
      async (res) => {
        console.log(res);
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Error',
          message: 'La cartera destino no existe',
					buttons: ['OK']
				});
        alert.present();
			}
		);

    this.loadForm();
  }

}
