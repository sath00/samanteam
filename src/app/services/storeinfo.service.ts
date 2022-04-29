import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { StoreInfo } from '../models/StoreInfo'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class storeInfoService {

    private storeinfo : StoreInfo[] = [];
    private storeinfoUpdated = new Subject<StoreInfo[]>();

    constructor(private http:HttpClient) { }

    //STORE INFO

    getStoreInfo() {
        this.http.get<StoreInfo[]>('http://localhost:3000/api/store-info/details').subscribe((storeinfoData) => {
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

        this.http.put<{message: string}>('http://localhost:3000/api/store-info/update',newStoreData).subscribe((responseData) => {
            console.log(responseData.message);
            this.getStoreInfo();
        })
    }
}