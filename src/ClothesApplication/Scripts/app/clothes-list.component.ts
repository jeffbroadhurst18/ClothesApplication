import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
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

    constructor(private clothesService: ClothesService, private router: Router) { }

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
            result => this.clothes = this.processResult(result),
            error => this.errorMessage = <any>error
        );
    }

    onSelect(item: ClothesItem) {
        this.selectedItem = item;
        this.router.navigate(['clothesItem/view', this.selectedItem.Id]);
    }

    processResult(clothesItems: Array<ClothesItem>)
    {
        var datePipe = new DatePipe();
        for (var i = 0; i < clothesItems.length; i++)
        {
            clothesItems[i].LastWornDateString = datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
        }
        return clothesItems;
    }
}