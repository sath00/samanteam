import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
}