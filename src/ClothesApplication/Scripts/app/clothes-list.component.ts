import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";

@Component({
    selector: "clothes-list",
    template: `
    <h3>{{title}}</h3>
    <ul class="items">
    <li *ngFor="let cloth of clothes"
        [class.selected]="cloth === selectedItem"
        (click)="onSelect(cloth)">
        <span>{{cloth.Description}}</span>
    </li>
    </ul>
`,
    styles: [`
            ul.items li {
                cursor: pointer;
            }
            ul.items li.selected {
                background-color: #cccccc;
            }
    `]
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

    constructor(private clothesService: ClothesService, private router:Router) { }
    
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
            result => this.clothes = result,
            error => this.errorMessage = <any>error
        );
    }

    //getCategoryItems() {
    //    this.clothesService.getClothesItemsByType(this.selectedCategory)
    //        .subscribe(result => this.clothes = this.processResult(result))
    //}

    //onChange(newVal: string) {
    //    var bits = newVal.split(":");
    //    this.selectedCategory = +bits[1];
    //    this.getCategoryItems();
    //    this.selectedCategoryName = this.clothesService.getCategoryName(this.selectedCategory);
    //}

    onSelect(item: ClothesItem) {
        this.selectedItem = item;
        this.router.navigate(['clothesItem/view', this.selectedItem.Id]);
    }

    //processResult(result: any) {
    //        return result;
    //}
}