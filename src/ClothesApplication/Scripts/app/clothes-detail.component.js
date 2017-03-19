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
    var core_1, router_1, clothes_service_1, ClothesDetailComponent;
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
            ClothesDetailComponent = class ClothesDetailComponent {
                constructor(clothesService, router, activatedRoute) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                }
                ngOnInit() {
                    this.activatedRoute.params.forEach((params) => {
                        let id = +params['id'];
                        this.clothesService.getCategoryItem(id).subscribe(clothesItem => this.clothesItem = clothesItem);
                    });
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.clothesService.getCategoryItem(id).subscribe(clothesItem => this.clothesItem = clothesItem);
                    }
                    else {
                        console.log("Invalid id: routing back to home");
                        this.router.navigate([""]);
                    }
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
                        <label>Description:</label>
                        <input [(ngModel)]="clothesItem.Description" placeholder="Insert the description..."/>
                    </li>
                    <li>
                        <label>Shop Purchased:</label>
                        <input [(ngModel)]="clothesItem.Shop" placeholder="Where was it purchased from?..."/>
                    </li>
                    <li>
                        <label>Date Last Worn:</label>
                        <input [(ngModel)]="clothesItem.LastWornDateString" placeholder="When was it last worn?..."/>
                    </li>
                    <li>
                        <label>How many times has it been worn?:</label>
                        <input [(ngModel)]="clothesItem.WornCount" placeholder="How many times has it been worn?..."/>
                    </li>
                </ul>
            </div>
            `,
                    styles: [`
            .item-details {
                margin: 5px;
                padding: 5px 10px;
                border: 1px solid black;
                background-color: #dddddd;
                width: 600px;
             }
            .item-details * {
                vertical-align: middle;
             }
            .item-details ul li {
                padding: 5px 0;
             }
            .item-details label { width: 300px; 
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
