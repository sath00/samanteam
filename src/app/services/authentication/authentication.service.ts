import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private isAuth = false;
    private token: string = "";
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
        const authData = {
            username: username,
            password: password
        }
        this.http.post<{ message: string, token: string, expiresIn: number }>('http://localhost:3000/api/login', authData)
            .subscribe((responseData) => {
                const token = responseData.token
                if (token) {
                    this.token = token;

                    //timer
                    const expireDuration = responseData.expiresIn
                    this.setAuthTimer(expireDuration)
                    this.isAuth = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/admin/view-dashboard']);
                    //save to local Storage
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + (expireDuration * 1000))
                    this.saveAuthData(this.token, expirationDate)
                }
                console.log(responseData.message)
            })
    }

    logout() {
        console.log("logging out");
        this.token = '';
        this.isAuth = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/admin']);
    }

    autoAuthOwner() {
        const authData = this.getAuthData();
        if (authData) {
            const now = new Date();
            const expireTime = authData.expiration.getTime() - now.getTime()
            if (expireTime > 0) {
                this.isAuth = true;
                this.token = authData.token;
                this.setAuthTimer(expireTime)
                this.authStatusListener.next(true);
            } 
        }
    }

    getToken() {
        return this.token
    }

    getAuth() {
        return this.isAuth;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        if (!token || !expiration) {
            return;
        }
        return {
            token: token,
            expiration: new Date(expiration)
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout()
        }, duration * 1000);
    }
}