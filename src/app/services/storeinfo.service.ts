import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { StoreInfo } from '../models/StoreInfo'
import { Subject } from 'rxjs'
import {environment } from '../../environments/environment'
import { SuccessDialogComponent } from "../success/success-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})

export class storeInfoService {

    private storeinfo : StoreInfo[] = [];
    private storeinfoUpdated = new Subject<StoreInfo[]>();

    constructor(private http: HttpClient, private dialog: MatDialog) { }

    //STORE INFO

    getStoreInfo() {
        this.http.get<StoreInfo[]>(environment.appURL +'/store-info/details').subscribe((storeinfoData) => {
            this.storeinfo = storeinfoData;
            this.storeinfoUpdated.next(this.storeinfo);
        })
    }

    getStoreUpdatedListener(){
        return this.storeinfoUpdated.asObservable();
    }

    updateStoreInfo(storeinfo: StoreInfo) {
        
        this.getStoreInfo();
        const newStoreData = {
            _id: this.storeinfo[0]._id,
            telephone: storeinfo.telephone,
            cellphone: storeinfo.cellphone,
            city: storeinfo.city,
            state: storeinfo.state,
            zip: storeinfo.zip,
            details: storeinfo.details
        }

        this.http.put<{ message: string }>(environment.appURL +'/store-info/update',newStoreData).subscribe((responseData) => {
            this.dialog.open(SuccessDialogComponent, {
                width: '300px',
                data: { message: responseData.message }
            });
            this.getStoreInfo();
        })
    }
}