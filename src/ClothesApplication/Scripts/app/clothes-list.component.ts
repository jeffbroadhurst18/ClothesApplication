import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { PagerService } from "./pager.service";
import { Category } from "./category";
import { DatePipe } from "@angular/common";

@Component({
    selector: "clothes-list",
    templateUrl: "./app/clothes-list.component.html"
})

export class ClothesListComponent implements OnInit {
    @Input() class: string;
    title: string;
    selectedCategory: number;
    selectedCategoryName: string;
    clothes: Array<ClothesItem>;
    categories: Array<Category>;
    selectedItem: ClothesItem;
    errorMessage: string;
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private clothesService: ClothesService, private router: Router,
        private pagerService: PagerService) { }

    ngOnInit() {
        this.categories = this.clothesService.getCategories();
        var s = null;
        switch (this.class) {
            case "tops":
            default:
                this.title = "Tops";
                s = this.clothesService.getClothesItemsByType(1);
                break;
            case "trousers":
                this.title = "Trousers";
                s = this.clothesService.getClothesItemsByType(2);
                break;
            case "shoes":
                this.title = "Shoes";
                s = this.clothesService.getClothesItemsByType(3);
                break;
        }
        s.subscribe(
            result => this.processResult(result),
            error => this.errorMessage = <any>error
        );
    }

    onSelect(item: ClothesItem) {
        this.selectedItem = item;
        this.router.navigate(['clothesItem/view', this.selectedItem.Id]);
    }

    processResult(clothesItems: Array<ClothesItem>) {
        var datePipe = new DatePipe();
        for (var i = 0; i < clothesItems.length; i++) {
            clothesItems[i].LastWornDateString = datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
        }
        this.clothes = clothesItems;
        this.setPage(1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.clothes.length, page);

        // get current page of items..
        this.pagedItems = this.clothes.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}