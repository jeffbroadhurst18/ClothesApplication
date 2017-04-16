import { Component, OnInit, NgModule, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ClothesItem } from "./clothes";
import { LogItem } from "./log";
import { ClothesService } from "./clothes.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: "clothes-grid",
    template: `
    <div class="col-md-4">
            <table class="table table-hover table-bordered clothesTable">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Shop</th>
                        <th>Last worn</th>
                        <th>Times worn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of items"
                        [class.selected]="item === selectedItemp"
                        (click)="onSelect(item)">
                        <td>{{item.Description}}</td>
                        <td>{{item.Shop}}</td>
                        <td>{{item.LastWornDateString}}</td>
                        <td>{{item.WornCount}}</td>
                    </tr>
                </tbody>
            </table>
            <div *ngIf="selectedItem">{{selectedItem.Description}}</div>
        </div>`
})

export class ClothesGridComponent implements OnInit {
    @Input() class: string;
    @Output() notify: EventEmitter<ClothesItem> = new EventEmitter<ClothesItem>();
    selectedItem: ClothesItem;
    errorMessage: string;
    datePipe: DatePipe;
    items: Array<ClothesItem>;

    constructor(private clothesService: ClothesService, private router: Router) { }

    ngOnInit() {
        var s = null;
        this.datePipe = new DatePipe();

        switch (this.class) {
            case "tops":
            default:
                s = this.clothesService.getClothesItemsByType(1)
                break;
            case "trousers":
                s = this.clothesService.getClothesItemsByType(2);
                break;
            case "shoes":
                s = this.clothesService.getClothesItemsByType(3);
                break;
        }
        s.subscribe(
            clothesItem => this.items = this.processResult(clothesItem),
            error => this.errorMessage = <any>error);
    }


    onSelect(item: ClothesItem) {
        this.selectedItem = item;
        this.notify.emit(item);
    }

    processResult(clothesItems: ClothesItem[]) {
        for (var i = 0; i < clothesItems.length; i++) {
            clothesItems[i].LastWornDateString = this.datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
        }
        return clothesItems;
    }
}