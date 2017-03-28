System.register(["@angular/core", "@angular/router", "@angular/common", "./clothes", "./clothes.service"], function (exports_1, context_1) {
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
    var core_1, router_1, common_1, clothes_1, clothes_service_1, ClothesDetailComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (clothes_1_1) {
                clothes_1 = clothes_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            }
        ],
        execute: function () {
            ClothesDetailComponent = class ClothesDetailComponent {
                constructor(clothesService, router, activatedRoute) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ngOnInit() {
                    this.disableSelect = true;
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.clothesService.getClothesItem(id).subscribe(clothesItem => this.processReturn(clothesItem));
                    }
                    else if (id === 0) {
                        console.log("id is 0: adding a new item...");
                        this.clothesItem = new clothes_1.ClothesItem(0, 0, "", "", new Date(2000, 1, 1), "01/01/2000", 0, new Date(2000, 1, 1), new Date(2000, 1, 1));
                    }
                    else {
                        console.log("Invalid id: routing back to home");
                        this.router.navigate([""]);
                    }
                    this.categories = this.clothesService.getCategories();
                }
                processReturn(clothesItem) {
                    this.clothesItem = clothesItem;
                    var datePipe = new common_1.DatePipe();
                    this.clothesItem.LastWornDateString = datePipe.transform(this.clothesItem.LastWornDate, 'dd/MM/yyyy');
                }
                onInsert(clothesItem) {
                    this.clothesService.add(clothesItem).subscribe((data) => {
                        this.clothesItem = data;
                        console.log("Item " + this.clothesItem.Id + " has been added");
                        this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onUpdate(clothesItem) {
                    this.clothesService.update(clothesItem).subscribe((data) => {
                        this.clothesItem = data;
                        console.log("Item " + this.clothesItem.Id + " has been updated");
                        this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onDelete(clothesItem) {
                    var id = clothesItem.Id;
                    this.clothesService.delete(id).subscribe((data) => {
                        console.log("Item " + this.clothesItem.Id + " has been deleted");
                        this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onBack() {
                    this.router.navigate([""]);
                }
            };
            ClothesDetailComponent = __decorate([
                core_1.Component({
                    selector: "clothes-detail",
                    template: `
            <div *ngIf="clothesItem" class="item-details">
                <h2>{{clothesItem.Description}} - Detail View</h2>
                <ul>
                    <li>
                        <label for="category">Category</label>
                        <select id="category" required [(ngModel)]="clothesItem.Type" [disabled]="clothesItem.Id != 0">
                        <option *ngFor="let category of categories" [ngValue]="category.id">{{category.name}}</option>
                        </select>
                    </li>
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
                        <input [disabled]="disableSelect" [(ngModel)]="clothesItem.LastWornDateString" placeholder="When was it last worn?..."/>
                    </li>
                    <li>
                        <label>How many times has it been worn?:</label>
                        <input [disabled]="disableSelect" [(ngModel)]="clothesItem.WornCount" placeholder="How many times has it been worn?..."/>
                    </li>
                </ul>
                <div *ngIf="clothesItem.Id == 0" class="commands insert">
                    <input type="button" value="Save" (click)="onInsert(clothesItem)" />
                    <input type="button" value="Cancel" (click)="onBack()" />
                </div>
                <div *ngIf="clothesItem.Id != 0" class="commands update">
                    <input type="button" value="Update" (click)="onUpdate(clothesItem)" />
                    <input type="button" value="Delete" (click)="onDelete(clothesItem)" />
                    <input type="button" value="Back" (click)="onBack(clothesItem)" />
                </div>
            </div>
            `,
                    styles: [`
            .item-details {
                margin: 5px;
                padding: 5px 10px;
                border: 1px solid black;
                background-color: #dddddd;
                width: 1000px;
             }
            .item-details * {
                vertical-align: middle;
             }
            .item-details ul li {
                padding: 5px 0;
             }
            .item-details label { width: 700px; 
                                  display:inline-block                                
}
            `]
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ClothesDetailComponent);
            exports_1("ClothesDetailComponent", ClothesDetailComponent);
        }
    };
});
