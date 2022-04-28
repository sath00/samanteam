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
        this.http.get<StoreInfo[]>('http://localhost:3000/api/storeInformation/details').subscribe((storeinfoData) => {
            this.storeinfo = storeinfoData;
            this.storeinfoUpdated.next(this.storeinfo);
        })
    }

    getStoreUpdatedListener(){
        return this.storeinfoUpdated.asObservable();
    }

    updateStoreInfo(storeinfo: StoreInfo) {
        
        const storeinfoData = new FormData();
        storeinfoData.append('telephone', storeinfo.telephone);
        storeinfoData.append('cellphone', storeinfo.cellphone);
        storeinfoData.append('city', storeinfo.city);
        storeinfoData.append('state', storeinfo.state); 
        storeinfoData.append('zip', storeinfo.zip);
        storeinfoData.append('details', storeinfo.details);

        this.http.put<{message: string}>('http://localhost:3000/api/storeInformation/update',storeinfoData).subscribe((responseData) => {
            console.log(responseData.message);
            this.getStoreInfo();
        })
    }
}