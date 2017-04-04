System.register(["@angular/core", "@angular/router", "@angular/common", "./clothes.service"], function (exports_1, context_1) {
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
    var core_1, router_1, common_1, clothes_service_1, ClothesDetailViewComponent;
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
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            }
        ],
        execute: function () {
            ClothesDetailViewComponent = class ClothesDetailViewComponent {
                constructor(clothesService, router, activatedRoute) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ngOnInit() {
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.clothesService.getClothesItem(id).subscribe(clothesItem => this.processReturn(clothesItem));
                    }
                    else if (id === 0) {
                        console.log("id is 0: switching to edit mode...");
                        this.router.navigate(["clothesItem/edit", 0]);
                    }
                    else {
                        console.log("Invalid id: routing back to home");
                        this.router.navigate([""]);
                    }
                }
                onItemDetailEdit(clothesItem) {
                    this.router.navigate(["clothesItem/edit", clothesItem.Id]);
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
            ClothesDetailViewComponent = __decorate([
                core_1.Component({
                    selector: "clothes-detail-view",
                    template: `
            <div *ngIf="clothesItem" class="item-container">
                <div class="item-tab-menu">
                    <span (click)="onItemDetailEdit(clothesItem)">Edit</span>
                    <span class="selected">View</span>
                </div>
                <div class="item-details">
                    <div class="mode">Display Mode</div>
                    <h2>{{clothesItem.Description}}</h2>
                    <table>
                    <tr><td class="label">Category</td><td class="words">{{clothesItem.Type | transformCategory}}</td></tr>
                    <tr><td class="label">Description</td><td class="words">{{clothesItem.Description}}</td></tr>
                    <tr><td class="label">Shop</td><td class="words">{{clothesItem.Shop}}</td></tr>
                    <tr><td class="label">Last Worn</td><td class="words">{{clothesItem.LastWornDateString}}</td></tr>
                    <tr><td class="label">Number of times worn</td><td class="words">{{clothesItem.WornCount}}</td></tr>
                    </table>
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
            color: #777777;
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
        }

        .item-details ul li {
            padding: 5px 0;
        }

        .item-details td {
             width: 400px;
            font-size: 1.6em;
        }

        .label {
            color:#4682B4;
             }
        .words {
            color: #00008B;
            }
            `]
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], ClothesDetailViewComponent);
            exports_1("ClothesDetailViewComponent", ClothesDetailViewComponent);
        }
    };
});
