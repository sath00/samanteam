import { Component } from "@angular/core";


@Component({
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent {
    message = "An unknown error occurred"
}