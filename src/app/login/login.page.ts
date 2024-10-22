import { AuthService } from '../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';


@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
    public menuCtrl: MenuController
	) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

	ngOnInit() {
		this.credentials = this.fb.group({
			mail: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		this.authService.login(this.credentials.value).subscribe(
			async (res) => {
				await loading.dismiss();
        this.menuCtrl.enable(true);
				this.router.navigateByUrl('home', { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Login failed',
					message: res.error.error,
					buttons: ['OK']
				});

				await alert.present();
			}
		);
	}

  goRegister(){
    console.log('HOLA');
    this.router.navigateByUrl('register', { replaceUrl: true });
  }

	// Easy access for form fields
	getEmail() {
		return this.credentials.get('mail');
	}

	getPassword() {
		return this.credentials.get('password');
	}
}
