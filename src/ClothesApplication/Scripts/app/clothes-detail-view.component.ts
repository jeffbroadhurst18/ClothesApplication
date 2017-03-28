import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";
import { TransformCategoryPipe } from "./clothes-pipe";

@Component({
    selector: "clothes-detail-view",
    template: `
            <div *ngIf="clothesItem" class="item-container">
                <div class="item-tab-menu">
                    <span (click)="onItemDetailEdit(clothesItem)">Edit</span>
                    <span class="selected">View</span>
                </div>
                <div class="item-details">
                    <div class="mode">Display Mode</div>
                    <h2>{{clothesItem.Description}}</h2>
                    <p>Category - {{clothesItem.Type | transformCategory}}</p>
                    <p>Description - {{clothesItem.Description}}</p>
                    <p>Shop - {{clothesItem.Shop}}</p>
                    <p>Last Worn - {{clothesItem.LastWornDateString}}</p>
                    <p>Number of times worn - {{clothesItem.WornCount}}</p>
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
            `]
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