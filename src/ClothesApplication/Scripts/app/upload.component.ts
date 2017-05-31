import { Component, OnInit, NgModule, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ClothesService } from "./clothes.service";
import { ClothesItem } from "./clothes";

@Component({
    selector: "upload",
    templateUrl: "./app/upload.component.html"
})

export class UploadComponent implements OnInit {

    baseUrl: string;
    apiUrl: string;
    errorMessage: string;
    clothes: ClothesItem[];
    selectedItem: number;

    constructor(private http: Http, private clothesService: ClothesService) {
        this.baseUrl = 'api/clothes/UploadFiles';
    }

    ngOnInit() {
        this.clothesService.getClothesItemsByType(1).subscribe(
            result => this.processResult(result),
            error => this.errorMessage = <any>error
        );
    }

    processResult(clothesItems: Array<ClothesItem>) {
        var datePipe = new DatePipe();
        for (var i = 0; i < clothesItems.length; i++) {
            clothesItems[i].LastWornDateString = datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
        }
        this.clothes = clothesItems;
    }



    fileChange(event) {
        let fileList: FileList = event.target.files;
        this.apiUrl = this.baseUrl + '/' + this.selectedItem;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('files', file, file.name);
            let headers = new Headers();
            headers.append('enctype', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.apiUrl, formData, options)
                //this.http.post(this.apiUrl, formData)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                data => console.log('success'),
                error => console.log(error))
        }
    }
}