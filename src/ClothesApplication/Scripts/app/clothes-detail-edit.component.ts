import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ClothesItem, FileExists } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";
import { AuthService } from "./auth.service";

@Component({
    selector: "clothes-detail-edit",
    templateUrl: "./app/clothes-detail-edit.component.html"
})

export class ClothesDetailEditComponent {
    clothesItem: ClothesItem;
    categories: Array<Category>;
    disableSelect: boolean;
    dateLastWorn: string;
    errorMessage: string;
    image0: string;
    fileFound: FileExists;
    baseUrl: string;
    apiUrl: string;
    swapper: boolean;

    constructor(private clothesService: ClothesService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private http: Http,
        private authService: AuthService) {

        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.baseUrl = 'api/clothes/UploadFiles';
        this.swapper = true;
    }

    ngOnInit() {
        this.disableSelect = true;

        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.clothesService.getClothesItem(id).subscribe(
                clothesItem => this.processReturn(clothesItem)
            );
        }
        else if (id === 0) {
            console.log("id is 0: adding a new item...");
            this.clothesItem = new ClothesItem(0, 0, "", "", new Date(2000, 0, 1), "01/01/2000", 0, new Date(2000, 0, 1), new Date(2000, 0, 1));
        }
        else {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }

        this.categories = this.clothesService.getCategories();
        this.errorMessage = "";

    }

    onItemDetailView(clothesItem: ClothesItem) {
        this.router.navigate(["clothesItem/view", clothesItem.Id]);
        return false;
    }

    processReturn(clothesItem: any) {
        this.clothesItem = clothesItem;
        var datePipe = new DatePipe();
        this.clothesItem.LastWornDateString = datePipe.transform(this.clothesItem.LastWornDate, 'dd/MM/yyyy');
        this.checkIfFileExists(this.clothesItem.Id);
        
    }

    checkIfFileExists(id: number)
    {
        this.clothesService.getFileExists(id).subscribe((data) => {
            this.fileFound = data;
            this.image0 = this.fileFound.ItExists ? '/images/' + id + '.jpg' + '?' + new Date().getTime() : '/images/noFile.jpg' + '?' + new Date().getTime();
            }, (error) => console.log(error)
        );
    }

    onInsert(clothesItem: ClothesItem) {
        this.clothesService.add(clothesItem).subscribe((data) => {
            this.clothesItem = data;
            console.log("Item " + this.clothesItem.Id + " has been added");
          //  this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onUpdate(clothesItem: ClothesItem) {
        this.clothesService.update(clothesItem).subscribe((data) => {
            this.errorMessage = "";
            this.clothesItem = data;
            console.log("Item " + this.clothesItem.Id + " has been updated.");
            this.router.navigate(["clothesItem/view", clothesItem.Id]);
        },
            (error) => console.log(error)
        );
    }

    onDelete(clothesItem: ClothesItem) {
        let id: number = clothesItem.Id;
        this.errorMessage = "";
        this.clothesService.delete(id).subscribe((data) => {
            console.log("Item " + this.clothesItem.Id + " has been deleted");
            this.router.navigate([""]);
        },
            (error) => this.displayError(error, id)
        );
    }

    displayError(error: any, id: number) {
        console.log("Error deleting clothesItem with id = " + id.toString());
        this.errorMessage = "The value could not be deleted. Item may be used in a history record.";
    }

    onBack() {
        this.router.navigate([""]);
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        let itemId: number = this.clothesItem != null ? this.clothesItem.Id : 0;
        this.apiUrl = this.baseUrl + '/' + itemId;
        this.clothesService.savePicture(fileList, itemId, this.apiUrl).subscribe(
            data => this.processFileChange(),
            error => console.log(error))
    }

    processFileChange()
    {
        console.log('Save Picture - success');
        this.checkIfFileExists(this.clothesItem.Id);
    }
}