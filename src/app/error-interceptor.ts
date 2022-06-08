import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";
import { ErrorDisplayComponent } from "./error/error-display.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog:MatDialog){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error:HttpErrorResponse)=>{
                let errorMessage;
                if(error.error.message){
                     errorMessage = error.error.message;
                }else{
                    errorMessage = "AN UNKNOWN ERROR OCCURED";
                }
                this.dialog.open(ErrorDisplayComponent, {
                    width: '300px',
                    data:{message:errorMessage}
                });
                return throwError(error)
            })
        )
    }
} 