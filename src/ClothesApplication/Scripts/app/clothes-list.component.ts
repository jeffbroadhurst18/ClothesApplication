import { Component, OnInit, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";

@Component({
    selector: "clothes-list",
    template: `<div>
    <label for="categories">Select Category</label>
    <select id="categories" required [(ngModel)]="selectedCategory" (change)="onChange($event.target.value)">
        <option *ngFor="let category of categories" [ngValue]="category.id">{{category.name}}</option>
    </select>
</div>

    <h2 *ngIf="selectedCategory">{{selectedCategoryName}}</h2>
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
}
)

export class ClothesListComponent implements OnInit {

    constructor(private clothesService: ClothesService, private router:Router) { }
    selectedCategory: number;
    selectedCategoryName: string;
    clothes: Array<ClothesItem>;
    categories: Array<Category>;
    selectedItem: ClothesItem;

    ngOnInit() {
        this.categories = this.clothesService.getCategories();
    }

    getCategoryItems() {
        this.clothesService.getClothesItemsByType(this.selectedCategory)
            .subscribe(result => this.clothes = this.processResult(result))
    }

    onChange(newVal: string) {
        var bits = newVal.split(":");
        this.selectedCategory = +bits[1];
        this.getCategoryItems();
        this.selectedCategoryName = this.clothesService.getCategoryName(this.selectedCategory);
    }

    onSelect(item: ClothesItem) {
        this.selectedItem = item;
        this.router.navigate(['clothesItem', this.selectedItem.Id]);
    }

    processResult(result: any) {
            return result;
    }
}