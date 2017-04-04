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
    var core_1, router_1, common_1, clothes_1, clothes_service_1, ClothesDetailEditComponent;
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
            ClothesDetailEditComponent = class ClothesDetailEditComponent {
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
                        this.clothesItem = new clothes_1.ClothesItem(0, 0, "", "", new Date(2000, 0, 1), "01/01/2000", 0, new Date(2000, 0, 1), new Date(2000, 0, 1));
                    }
                    else {
                        console.log("Invalid id: routing back to home");
                        this.router.navigate([""]);
                    }
                    this.categories = this.clothesService.getCategories();
                }
                onItemDetailView(clothesItem) {
                    this.router.navigate(["clothesItem/view", clothesItem.Id]);
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
            ClothesDetailEditComponent = __decorate([
                core_1.Component({
                    selector: "clothes-detail-edit",
                    template: `
            <div *ngIf="clothesItem" class="item-container">
                <div class="item-tab-menu">
                    <span class="selected">Edit</span>
                    <span *ngIf="clothesItem.Id != 0" 
                        (click)="onItemDetailView(clothesItem)">View</span>
                </div>
                <div class="item-details">
                    <div class="mode">Edit Mode</div>
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
                    </ul>
                    <div *ngIf="clothesItem.Id == 0" class="commands insert">
                        <input type="button" value="Save" (click)="onInsert(clothesItem)" />
                        <input type="button" value="Cancel" (click)="onBack()" />
                    </div>
                    <div *ngIf="clothesItem.Id != 0" class="commands update">
                        <input type="button" value="Update" (click)="onUpdate(clothesItem)" />
                        <input type="button" value="Delete" (click)="onDelete(clothesItem)" />
                        <input type="button" value="Cancel" (click)="onItemDetailView(clothesItem)" />
                    </div>
                </div>
            `,
                    styles: [`
            .item-container {  
                width: 600px;
            }

            .item-tab-menu {
                margin-right: 30px;
            }

            .item-tab-menu span {
                background-color: #dddddd;
                border: 1px solid #666666;
                border-bottom: 0;
                cursor: pointer;
                display: block;
                float: right;
                margin: 0 0 -1px 5px;
                padding: 5px 10px 4px 10px;
                text-align: center;
                width: 60px;
            }

            .item-tab-menu span.selected {
                background-color: #eeeeee;
                cursor: auto;
                font-weight: bold;
                padding-bottom: 5px;
            }

            .item-details {
                background-color: #eeeeee;
                border: 1px solid black;
                clear: both;
                margin: 0;
                padding: 5px 10px;
            }

            .item-details * {
                vertical-align: middle;
            }

            .item-details .mode {
                font-size: 0.8em;
                color: #777777;
            }

            .item-details ul li {
                padding: 5px 0;
            }

            .item-details input[type="text"] {
                display: block;
                width: 100%;
            }

            .item-details textarea {
                display: block;
                width: 100%;
                height: 60px;
            }

            .item-details label {
                width:300px;
                font-size: 1.0em;
                }

            .commands {
                text-align: right;
                margin: 10px 20px 10px 10px;
            }
    `]
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ClothesDetailEditComponent);
            exports_1("ClothesDetailEditComponent", ClothesDetailEditComponent);
        }
    };
});
