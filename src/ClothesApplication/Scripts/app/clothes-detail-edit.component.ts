import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";

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

    constructor(private clothesService: ClothesService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

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

    onItemDetailView(clothesItem: ClothesItem)
    {
        this.router.navigate(["clothesItem/view", clothesItem.Id]);
    }

    processReturn(clothesItem: any) {
        this.clothesItem = clothesItem;
        var datePipe = new DatePipe();
        this.clothesItem.LastWornDateString = datePipe.transform(this.clothesItem.LastWornDate, 'dd/MM/yyyy');
    }

    onInsert(clothesItem: ClothesItem) {
        this.clothesService.add(clothesItem).subscribe((data) => {
            this.clothesItem = data;
            console.log("Item " + this.clothesItem.Id + " has been added");
            this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onUpdate(clothesItem: ClothesItem) {
        this.clothesService.update(clothesItem).subscribe((data) => {
            this.clothesItem = data;
            console.log("Item " + this.clothesItem.Id + " has been updated");
            this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onDelete(clothesItem: ClothesItem) {
        var id = clothesItem.Id;
        this.clothesService.delete(id).subscribe((data) => {
            console.log("Item " + this.clothesItem.Id + " has been deleted");
            this.router.navigate([""]);
        },
            (error) => this.displayError(error)
        );
    }

    displayError(error: any) {
        console.log(error); 
        this.errorMessage = "The value could not be deleted.";
    }

    onBack() {
        this.router.navigate([""]);
    }
}