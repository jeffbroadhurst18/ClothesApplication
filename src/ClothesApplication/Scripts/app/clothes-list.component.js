System.register(["@angular/core", "@angular/router", "./clothes.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, clothes_service_1, ClothesListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            }
        ],
        execute: function () {
            ClothesListComponent = class ClothesListComponent {
                constructor(clothesService, router) {
                    this.clothesService = clothesService;
                    this.router = router;
                }
                ngOnInit() {
                    this.categories = this.clothesService.getCategories();
                }
                getCategoryItems() {
                    this.clothesService.getClothesItemsByType(this.selectedCategory)
                        .subscribe(result => this.clothes = this.processResult(result));
                }
                onChange(newVal) {
                    var bits = newVal.split(":");
                    this.selectedCategory = +bits[1];
                    this.getCategoryItems();
                    this.selectedCategoryName = this.clothesService.getCategoryName(this.selectedCategory);
                }
                onSelect(item) {
                    this.selectedItem = item;
                    this.router.navigate(['clothesItem', this.selectedItem.Id]);
                }
                processResult(result) {
                    return result;
                }
            };
            ClothesListComponent = __decorate([
                core_1.Component({
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
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService, router_1.Router])
            ], ClothesListComponent);
            exports_1("ClothesListComponent", ClothesListComponent);
        }
    };
});
