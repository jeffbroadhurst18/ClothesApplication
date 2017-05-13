import { Component, OnInit, NgModule, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ClothesItem } from "./clothes";
import { LogItem } from "./log";
import { ClothesService } from "./clothes.service";
import { PagerService } from "./pager.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: "clothes-grid",
    templateUrl: "./app/clothes-grid.component.html"
})

export class ClothesGridComponent implements OnInit {
    @Input() class: string;
    @Output() notify: EventEmitter<ClothesItem> = new EventEmitter<ClothesItem>();
    selectedItem: ClothesItem;
    errorMessage: string;
    datePipe: DatePipe;
    items: Array<ClothesItem>;
    selCol: Number;
    compareAsc: Boolean;
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private clothesService: ClothesService, private router: Router,
        private pagerService: PagerService) { }

    ngOnInit() {
        var s = null;
        this.datePipe = new DatePipe();
        this.selCol = 0;

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
            clothesItem => this.processResult(clothesItem),
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
        this.items = clothesItems;
        this.setPage(1);
    }

    onSelectCol(num: Number) {
        //same column
        if (this.selCol != null && this.selCol == num) {
            this.compareAsc = !this.compareAsc;
        }
        else {
            //new column
            this.selCol = num;
            this.compareAsc = true;
        }

        this.sortItems(this.compareAsc, num);
    }

    sortItems(compareAsc: Boolean, num: Number) {
        if (compareAsc) {
            this.items = this.sort(this.items);
        }
        else {
            this.items = this.sortDesc(this.items);
        }
        this.setPage(1);
    }

    sort(clothesList: ClothesItem[]): ClothesItem[] {
        switch (this.selCol) {
            case 1:
            default:
                return clothesList.sort(this.compareDesc);
            case 2:
                return clothesList.sort(this.compareShop);
            case 3:
                return clothesList.sort(this.compareLast);
            case 4:
                return clothesList.sort(this.compareTimes);
        }
    }

    sortDesc(clothesList: ClothesItem[]): ClothesItem[] {
        switch (this.selCol) {
            case 1:
            default:
                return clothesList.sort(this.compareDescAlt);
            case 2:
                return clothesList.sort(this.compareShopAlt);
            case 3:
                return clothesList.sort(this.compareLastAlt);
            case 4:
                return clothesList.sort(this.compareTimesAlt);
        }
    }

    compareDesc(a: ClothesItem, b: ClothesItem) {
        if (a.Description > b.Description) return 1;
        if (a.Description < b.Description) return -1;
        return 0;
    }

    compareDescAlt(a: ClothesItem, b: ClothesItem) {
        if (a.Description < b.Description) return 1;
        if (a.Description > b.Description) return -1;
        return 0;
    }

    compareShop(a: ClothesItem, b: ClothesItem) {
        if (a.Shop > b.Shop) return 1;
        if (a.Shop < b.Shop) return -1;
        return 0;
    }

    compareShopAlt(a: ClothesItem, b: ClothesItem) {
        if (a.Shop < b.Shop) return 1;
        if (a.Shop > b.Shop) return -1;
        return 0;
    }

    compareLast(a: ClothesItem, b: ClothesItem) {
        if (a.LastWornDate > b.LastWornDate) return 1;
        if (a.LastWornDate < b.LastWornDate) return -1;
        return 0;
    }

    compareLastAlt(a: ClothesItem, b: ClothesItem) {
        if (a.LastWornDate < b.LastWornDate) return 1;
        if (a.LastWornDate > b.LastWornDate) return -1;
        return 0;
    }

    compareTimes(a: ClothesItem, b: ClothesItem) {
        if (a.WornCount > b.WornCount) return 1;
        if (a.WornCount < b.WornCount) return -1;
        return 0;
    }

    compareTimesAlt(a: ClothesItem, b: ClothesItem) {
        if (a.WornCount < b.WornCount) return 1;
        if (a.WornCount > b.WornCount) return -1;
        return 0;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.items.length, page);

        // get current page of items..
        this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
