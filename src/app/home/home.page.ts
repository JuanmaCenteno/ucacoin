/* eslint-disable @typescript-eslint/member-ordering */
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../servicios/auth.service';
import {MenuController} from '@ionic/angular';
import Chart from 'chart.js/auto';
import {DatePipe} from '@angular/common';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild('barChartCanvasGraficoTransacciones') private barChartCanvasGraficoTransacciones: ElementRef;
  @ViewChild('donutChartCanvasSaldo') private donutChartCanvasSaldo: ElementRef;

  barChart: any;
  doughnutChart: any;

  datosSaldo = [];
  datosTransa = [10,5,20,30,110,10,5,11,40,55,60,90];


  email: string;

  months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
  ];

    monthsFinal = [];

    public date = new Date();
    public mes: string;
    public year: string;
    public balance: any = [];
    public historial: any = [];
    public balanceable: boolean;


    // eslint-disable-next-line max-len
    constructor(public authService: AuthService, private menuController: MenuController, private datePipe: DatePipe) {
        // Uso el constructor ya que en el onInit no le da tiempo a inicializar
        this.loadAll();
        this.menuController.enable(true);
    }

    ionViewDidEnter() {
      //this.destroyCharts();
    }

    ngOnInit() {
    }

    onLogOut() {
        //this.authService.logout();
        this.menuController.enable(false);
    }

    loadAll() {
        this.mes = this.datePipe.transform(this.date, 'yyyy-MM-dd').substr(5, 2);
        this.year = this.datePipe.transform(this.date, 'yyyy-MM-dd').substr(0, 4);
        this.getDataBalance();
        this.getDataHistorial();
    }

    // PETICIONES GET BDD

    getDataBalance() {
        this.authService.balance().subscribe(balance => {
            this.balance = [balance.balance, parseFloat(balance.balance) * 2];
            console.log(this.balance);
            this.balanceable = true;
            this.createPieCharts();
            this.createBarCharts();
        });
    }

    getDataHistorial() {
      this.authService.historial().subscribe(result => {
        this.historial = result.transacciones;
        this.historial = this.historial.slice(1).slice(-5);
        this.filterCartera();
        console.log(this.historial);
      });
  }

    // CREACIÓN CHARTS

    createPieCharts() {
        // Cambiar Colores

        this.doughnutChart = new Chart(this.donutChartCanvasSaldo.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['Usado', 'Restante']
                ,
                datasets: [{
                    data: this.balance,
                    backgroundColor: [
                      'rgba(255, 255, 255)',
                      'rgba(243, 186, 47)'
                    ],
                }]
            },
            options: {
              plugins: {
                legend:{
                  labels: {
                    color: 'white'
                }
                }
              }
            }
        });
    }

    createBarCharts() {
        // Cambiar Colores
        this.barChart = new Chart(this.barChartCanvasGraficoTransacciones.nativeElement, {
            type: 'line',
            data: {
                labels: this.months,
                datasets: [{
                  data: this.datosTransa, label: 'Nº de Transacciones',
                  backgroundColor: '#f3ba2f',
                  borderColor: '#f3ba2f',}]
            },
            options: {
              plugins: {
                legend:{
                  display: false
                }
              },
              scales: {
                y: {
                  ticks: {
                    color: 'white',
                    stepSize: 1
                  }
                },
                x: {  // not 'xAxes: [{' anymore (not an array anymore)
                  ticks: {
                    color: 'white',  // not 'fontColor:' anymore
                    //fontSize: 14,
                    font: {
                      size: 14 // 'size' now within object 'font {}'
                    },
                    stepSize: 1
                  }
                }
              }
            }

        });
    }

    destroyCharts(){
        this.doughnutChart.destroy();
        this.barChart.destroy();
    }

    filterCartera(){
      this.historial.forEach(element => {
        element.receptor = this.cifrarCartera(element);
      });
    }

    cifrarCartera(element){
      const hash = CryptoJS.SHA256(element).toString(CryptoJS.enc.Hex).substr(0,16);
      console.log(hash);
      return hash;
    }


    doRefresh(event) {
        console.log('Begin async operation');
        this.menuController.enable(true);
        this.destroyCharts();
        this.loadAll();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

}
