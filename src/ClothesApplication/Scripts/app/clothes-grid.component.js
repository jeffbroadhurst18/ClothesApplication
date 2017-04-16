System.register(["@angular/core", "@angular/router", "./clothes.service", "@angular/common"], function (exports_1, context_1) {
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
    var core_1, router_1, clothes_service_1, common_1, ClothesGridComponent;
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
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            ClothesGridComponent = class ClothesGridComponent {
                constructor(clothesService, router) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.notify = new core_1.EventEmitter();
                }
                ngOnInit() {
                    var s = null;
                    this.datePipe = new common_1.DatePipe();
                    switch (this.class) {
                        case "tops":
                        default:
                            s = this.clothesService.getClothesItemsByType(1);
                            break;
                        case "trousers":
                            s = this.clothesService.getClothesItemsByType(2);
                            break;
                        case "shoes":
                            s = this.clothesService.getClothesItemsByType(3);
                            break;
                    }
                    s.subscribe(clothesItem => this.items = this.processResult(clothesItem), error => this.errorMessage = error);
                }
                onSelect(item) {
                    this.selectedItem = item;
                    this.notify.emit(item);
                }
                processResult(clothesItems) {
                    for (var i = 0; i < clothesItems.length; i++) {
                        clothesItems[i].LastWornDateString = this.datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
                    }
                    return clothesItems;
                }
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ClothesGridComponent.prototype, "class", void 0);
            __decorate([
                core_1.Output(),
                __metadata("design:type", core_1.EventEmitter)
            ], ClothesGridComponent.prototype, "notify", void 0);
            ClothesGridComponent = __decorate([
                core_1.Component({
                    selector: "clothes-grid",
                    template: `
    <div class="col-md-4">
            <table class="table table-hover table-bordered clothesTable">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Shop</th>
                        <th>Last worn</th>
                        <th>Times worn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of items"
                        [class.selected]="item === selectedItemp"
                        (click)="onSelect(item)">
                        <td>{{item.Description}}</td>
                        <td>{{item.Shop}}</td>
                        <td>{{item.LastWornDateString}}</td>
                        <td>{{item.WornCount}}</td>
                    </tr>
                </tbody>
            </table>
            <div *ngIf="selectedItem">{{selectedItem.Description}}</div>
        </div>`
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService, router_1.Router])
            ], ClothesGridComponent);
            exports_1("ClothesGridComponent", ClothesGridComponent);
        }
    };
});
