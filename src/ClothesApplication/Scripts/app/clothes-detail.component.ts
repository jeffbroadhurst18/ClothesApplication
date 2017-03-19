import { Component, Input } from "@angular/core";
import { ClothesItem } from "./clothes";

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
            `]
})

export class ClothesDetailComponent {
    @Input("clothesItem") clothesItem: ClothesItem;
}