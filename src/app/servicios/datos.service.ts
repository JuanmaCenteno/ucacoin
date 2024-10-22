/* eslint-disable max-len */
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DatosService {

    constructor(private http: HttpClient) {
    }

    login(email: string, pass: string) {
      return this.http.post('http://178.62.19.126:8080/historial', [{mail: email}, {password: pass}]);
    }
    /*

    getLlamadas(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=llamadas&email=" + email + "&month=" + mes);
    }

    getMensajes(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=mensajes&email=" + email + "&month=" + mes);
    }

    getConsumo(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=consumo&email=" + email + "&month=" + mes);
    }

    getListaLlamadas(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=listaLlamadas&email=" + email + "&month=" + mes);
    }

    getListaMensajes(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=listaMensajes&email=" + email + "&month=" + mes);
    }

    getConsumoRelativo(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=consumoRelativo&email=" + email + "&month=" + mes);
    }

    getLlamadasRelativo(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=llamadasRelativo&email=" + email + "&month=" + mes);
    }

    getMensajesRelativo(email: any, mes: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=mensajesRelativo&email=" + email + "&month=" + mes);
    }

    getConsumoAnual(email: any, year: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=consumoAnual&email=" + email + "&month=" + year);
    }

    getLlamadasAnual(email: any, year: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=llamadasAnual&email=" + email + "&month=" + year);
    }

    getMensajesAnual(email: any, year: string) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=mensajesAnual&email=" + email + "&month=" + year);
    }

    getInfoUsuario(email: any) {
        return this.http.get("https://subeelproyectoquenece.site/tfg/crud_api/getInfo.php?accion=infoUsuario&email=" + email);
    }
    */
}
