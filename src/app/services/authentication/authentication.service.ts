import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment'
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/success/success-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private isAuth = false;
    private token: string = "";
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;


    constructor(private http: HttpClient, private router: Router, private dialog:MatDialog) { }

    loginOwner(username: string, password: string) {
        const authData = {
            username: username,
            password: password
        }
        this.http.post<{ message: string, token: string, expiresIn: number }>(environment.appURL +'/admin/login', authData)
            .subscribe((responseData) => {
                const token = responseData.token
                if (token) {
                    this.token = token;

                    //timer
                    const expireDuration = responseData.expiresIn
                    this.setAuthTimer(expireDuration)
                    this.isAuth = true;
                    this.authStatusListener.next(true);
                    this.router.navigate(['/admin']);
                    //save to local Storage
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + (expireDuration * 1000))
                    this.saveAuthData(this.token, expirationDate)
                }
            }, error => {
               this.authStatusListener.next(false);
             })
    }

    logoutOwner() {
        console.log("logging out");
        this.token = '';
        this.isAuth = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/admin']);
    }


    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logoutOwner()
        }, duration * 1000);
    }

    autoAuthOwner() {
        const authData = this.getAuthData();
        if (authData) {
            const now = new Date();
            const expireTime = authData.expiration.getTime() - now.getTime()
            if (expireTime > 0) {
                this.isAuth = true;
                this.token = authData.token;
                this.setAuthTimer(expireTime/1000)
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

    updateCredentials(username: string, currentPassword: string, newPassword: string){
        const newCredentials = {
            username: username,
            currentPassword:currentPassword,
            newPassword:newPassword
        }
        this.http.put<{ message: string }>(environment.appURL +'/admin/edit',newCredentials)
        .subscribe((responseData)=>{
            this.dialog.open(SuccessDialogComponent, {
                width: '300px',
                data: { message: responseData.message }
            });
        })
    }

}
