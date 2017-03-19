import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";

@Component({
    selector: "clothes-detail",
    template: `
            <div *ngIf="clothesItem" class="item-details">
                <h2>{{clothesItem.Description}} - Detail View</h2>
                <ul>
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
                        <input [(ngModel)]="clothesItem.LastWornDateString" placeholder="When was it last worn?..."/>
                    </li>
                    <li>
                        <label>How many times has it been worn?:</label>
                        <input [(ngModel)]="clothesItem.WornCount" placeholder="How many times has it been worn?..."/>
                    </li>
                </ul>
            </div>
            `,
    styles: [`
            .item-details {
                margin: 5px;
                padding: 5px 10px;
                border: 1px solid black;
                background-color: #dddddd;
                width: 600px;
             }
            .item-details * {
                vertical-align: middle;
             }
            .item-details ul li {
                padding: 5px 0;
             }
            .item-details label { width: 300px; 
                                  display:inline-block                                
}
            `]
})

export class ClothesDetailComponent {
    clothesItem: ClothesItem;

    constructor(private clothesService: ClothesService,
        private router: Router,
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit() {
         this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.clothesService.getCategoryItem(id).subscribe(clothesItem => this.clothesItem = clothesItem);
        });
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.clothesService.getCategoryItem(id).subscribe(
                clothesItem => this.clothesItem = clothesItem
            );
        }
        else
        {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }
    }
}