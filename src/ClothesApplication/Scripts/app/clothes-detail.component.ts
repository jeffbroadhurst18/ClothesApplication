import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";

@Component({
    selector: "clothes-detail",
    template: `
            <div *ngIf="clothesItem" class="item-details">
                <h2>{{clothesItem.Description}} - Detail View</h2>
                <ul>
                    <li>
                        <label for="category">Category</label>
                        <select id="category" required [(ngModel)]="clothesItem.Type" [disabled]="clothesItem.Id != 0">
                        <option *ngFor="let category of categories" [ngValue]="category.id">{{category.name}}</option>
                        </select>
                    </li>
                    <li>
                        <label>Description:</label>
                        <input [(ngModel)]="clothesItem.Description" placeholder="Insert the description..."/>
                    </li>
                    <li>
                        <label>Shop Purchased:</label>
                        <input [(ngModel)]="clothesItem.Shop" placeholder="Where was it purchased from?..."/>
                    </li>
                    <li>
                        <label>Date Last Worn:</label>
                        <input [disabled]="disableSelect" [(ngModel)]="clothesItem.LastWornDateString" placeholder="When was it last worn?..."/>
                    </li>
                    <li>
                        <label>How many times has it been worn?:</label>
                        <input [disabled]="disableSelect" [(ngModel)]="clothesItem.WornCount" placeholder="How many times has it been worn?..."/>
                    </li>
                </ul>
                <div *ngIf="clothesItem.Id == 0" class="commands insert">
                    <input type="button" value="Save" (click)="onInsert(clothesItem)" />
                    <input type="button" value="Cancel" (click)="onBack()" />
                </div>
                <div *ngIf="clothesItem.Id != 0" class="commands update">
                    <input type="button" value="Update" (click)="onUpdate(clothesItem)" />
                    <input type="button" value="Delete" (click)="onDelete(clothesItem)" />
                    <input type="button" value="Back" (click)="onBack(clothesItem)" />
                </div>
            </div>
            `,
    styles: [`
            .item-details {
                margin: 5px;
                padding: 5px 10px;
                border: 1px solid black;
                background-color: #dddddd;
                width: 1000px;
             }
            .item-details * {
                vertical-align: middle;
             }
            .item-details ul li {
                padding: 5px 0;
             }
            .item-details label { width: 700px; 
                                  display:inline-block                                
}
            `]
})

export class ClothesDetailComponent {
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
            this.clothesItem = new ClothesItem(0, 0, "", "", new Date(2000, 1, 1), "01/01/2000", 0, new Date(2000, 1, 1), new Date(2000, 1, 1));
        }
        else {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }

        this.categories = this.clothesService.getCategories();
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