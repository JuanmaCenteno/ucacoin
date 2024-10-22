import { AuthService } from '../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
		private authService: AuthService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
    public menuCtrl: MenuController
  ) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

	ngOnInit() {
		this.credentials = this.fb.group({
      username: ['', [Validators.required]],
			mail: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	async register() {
		const loading = await this.loadingController.create();
		await loading.present();

		this.authService.register(this.credentials.value).subscribe(
			async (res) => {
				await loading.dismiss();
        this.menuCtrl.enable(true);
        const alert = await this.alertController.create({
					header: 'Éxito',
					message: 'Se ha registrado correctamente',
					buttons: [{
            text: 'OK',
            handler: () => {
              this.router.navigateByUrl('login', { replaceUrl: true });
            }
          }]
				});

				await alert.present();
				//this.router.navigateByUrl('home', { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'ERROR',
					message: 'Ya existe una cuenta con ese nombre',
					buttons: ['OK']
				});

				await alert.present();
			}
		);
	}

	// Easy access for form fields
	getEmail() {
		return this.credentials.get('mail');
	}

	getPassword() {
		return this.credentials.get('password');
	}

}
