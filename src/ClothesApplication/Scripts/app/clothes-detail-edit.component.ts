import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";

@Component({
    selector: "clothes-detail-edit",
    template: `
            <div *ngIf="clothesItem" class="item-container">
    <h2>
        <a href="#" (click)="onBack()">&laquo;Back to Home</a>
    </h2>
    <div class="item-container">
        <ul class="nav nav-tabs">
            <li role="presentation">
                <a href="#" class="active">Edit</a>
            </li>
            <li role="presentation" *ngIf="clothesItem.Id !=0">
                <a href="#" (click)="onItemDetailView(clothesItem)">View</a>
            </li>
        </ul>
        <div class="panel panel-default">
            <div class="panel-body">
                <form class="item-detail-edit">
                    <h3>{{clothesItem.Description}}</h3>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="input-category" required [(ngModel)]="clothesItem.Type" class="form-control" [disabled]="clothesItem.Id != 0">
                            <option *ngFor="let category of categories" [ngValue]="category.id">{{category.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <input [(ngModel)]="clothesItem.Description" name="input-description" class="form-control" placeholder="Insert the description..." />
                    </div>
                    <div class="form-group">
                        <label>Shop Purchased:</label>
                        <input [(ngModel)]="clothesItem.Shop" name="input-shop" class="form-control" placeholder="Where was it purchased from?..." />
                    </div>

                    <div *ngIf="clothesItem.Id == 0" class="commands insert">
                        <input type="button" value="Save" class="btn btn-primary" (click)="onInsert(clothesItem)" />
                        <input type="button" value="Cancel" class="btn btn-default" (click)="onBack()" />
                    </div>
                    <div *ngIf="clothesItem.Id != 0" class="commands update">
                        <input type="button" value="Update" class="btn btn-primary" (click)="onUpdate(clothesItem)" />
                        <input type="button" value="Delete" class="btn btn-danger" (click)="onDelete(clothesItem)" />
                        <input type="button" value="Cancel" class="btn btn-default" (click)="onItemDetailView(clothesItem)" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>`
})

export class ClothesDetailEditComponent {
    clothesItem: ClothesItem;
    categories: Array<Category>;
    disableSelect: boolean;
    dateLastWorn: string;

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
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }
}