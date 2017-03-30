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
                <div class="item-tab-menu">
                    <span class="selected">Edit</span>
                    <span *ngIf="clothesItem.Id != 0" 
                        (click)="onItemDetailView(clothesItem)">View</span>
                </div>
                <div class="item-details">
                    <div class="mode">Edit Mode</div>
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
                        <input type="button" value="Cancel" (click)="onItemDetailView(clothesItem)" />
                    </div>
                </div>
            `,
    styles: [`
            .item-container {  
                width: 600px;
            }

            .item-tab-menu {
                margin-right: 30px;
            }

            .item-tab-menu span {
                background-color: #dddddd;
                border: 1px solid #666666;
                border-bottom: 0;
                cursor: pointer;
                display: block;
                float: right;
                margin: 0 0 -1px 5px;
                padding: 5px 10px 4px 10px;
                text-align: center;
                width: 60px;
            }

            .item-tab-menu span.selected {
                background-color: #eeeeee;
                cursor: auto;
                font-weight: bold;
                padding-bottom: 5px;
            }

            .item-details {
                background-color: #eeeeee;
                border: 1px solid black;
                clear: both;
                margin: 0;
                padding: 5px 10px;
            }

            .item-details * {
                vertical-align: middle;
            }

            .item-details .mode {
                font-size: 0.8em;
                color: #777777;
            }

            .item-details ul li {
                padding: 5px 0;
            }

            .item-details input[type="text"] {
                display: block;
                width: 100%;
            }

            .item-details textarea {
                display: block;
                width: 100%;
                height: 60px;
            }

            .commands {
                text-align: right;
                margin: 10px 20px 10px 10px;
            }
    `]
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