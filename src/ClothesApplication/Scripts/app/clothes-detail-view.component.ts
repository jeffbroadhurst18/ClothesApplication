import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";
import { TransformCategoryPipe } from "./clothes-pipe";

@Component({
    selector: "clothes-detail-view",
    template: `<div *ngIf="clothesItem" class="item-container">
                <h2>
                    <a href="#" (click)="onBack()">&laquo;Back to Home</a>
                </h2>
                <div class="item-container">
                    <ul class="nav nav-tabs">
                        <li role="presentation">
                            <a href="#" (click)="onItemDetailEdit(clothesItem)">Edit</a>
                        </li>
                        <li role="presentation" class="active">
                            <a href="#">View</a>
                        </li>
                    </ul>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h3>{{clothesItem.Description}}</h3>
                            <table>
                                <tr><td class="clothesLabel">Category</td><td class="words">{{clothesItem.Type | transformCategory}}</td></tr>
                                <tr><td class="clothesLabel">Description</td><td class="words">{{clothesItem.Description}}</td></tr>
                                <tr><td class="clothesLabel">Shop</td><td class="words">{{clothesItem.Shop}}</td></tr>
                                <tr><td class="clothesLabel">Last Worn</td><td class="words">{{clothesItem.LastWornDateString}}</td></tr>
                                <tr><td class="clothesLabel">Number of times worn</td><td class="words">{{clothesItem.WornCount}}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`
})

export class ClothesDetailViewComponent {
    clothesItem: ClothesItem;
    categories: Array<Category>;
    disableSelect: boolean;
    dateLastWorn: string;

    constructor(private clothesService: ClothesService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.clothesService.getClothesItem(id).subscribe(
                clothesItem => this.processReturn(clothesItem)
            );
        }
        else if (id === 0) {
            console.log("id is 0: switching to edit mode...");
            this.router.navigate(["clothesItem/edit", 0]);
        }
        else {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }
    }

    onItemDetailEdit(clothesItem: ClothesItem) {
        this.router.navigate(["clothesItem/edit", clothesItem.Id]);
        return false;
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
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }
}