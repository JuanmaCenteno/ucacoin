/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	// Init with null to filter out the first value in a guard!
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
	token = '';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json'
    })
};

	constructor(private http: HttpClient) {
		this.loadToken();
	}

	async loadToken() {
		const token = await Preferences.get({ key: TOKEN_KEY });
		if (token && token.value) {
			console.log('set token: ', token.value);
			this.token = token.value;
			this.isAuthenticated.next(true);
		} else {
			this.isAuthenticated.next(false);
		}
	}

	login(credentials: { mail; password }): Observable<any> {
		return this.http.post(`http://178.62.19.126:8080/login`, credentials, this.httpOptions).pipe(
			map((data: any) => data.token),
			switchMap((token) => from(Preferences.set({ key: TOKEN_KEY, value: token }))),
			tap((_) => {
				this.isAuthenticated.next(true);
        this.loadToken();
			})
		);
	}

  register(credentials: { username; mail; password }): Observable<any> {
		return this.http.post(`http://178.62.19.126:8080/registro`, credentials, this.httpOptions);
	}

  send(credentials: { token; receptor; cantidad }): Observable<any> {
    credentials.token = this.token;
		return this.http.post(`http://178.62.19.126:8080/enviar`, credentials);
	}

  historial(): Observable<any> {
		return this.http.post('http://178.62.19.126:8080/historial', {token: this.token});
	}

  balance(): Observable<any> {
		return this.http.post('http://178.62.19.126:8080/balance', {token: this.token});
	}

	logout(): Promise<any>{
    this.http.post('http://178.62.19.126:8080/logout', {token: this.token});
		this.isAuthenticated.next(false);
		return Preferences.remove({ key: TOKEN_KEY });
	}
}
