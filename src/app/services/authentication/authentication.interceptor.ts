import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authtoken = this.authService.getToken()
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + authtoken)
        })
        return next.handle(authRequest)
    }
} 