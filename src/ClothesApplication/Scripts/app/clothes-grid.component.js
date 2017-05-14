System.register(["@angular/core", "@angular/router", "./clothes.service", "./pager.service", "@angular/common"], function (exports_1, context_1) {
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
    var core_1, router_1, clothes_service_1, pager_service_1, common_1, ClothesGridComponent;
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
            function (pager_service_1_1) {
                pager_service_1 = pager_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }
        ],
        execute: function () {
            ClothesGridComponent = class ClothesGridComponent {
                constructor(clothesService, router, pagerService) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.pagerService = pagerService;
                    this.notify = new core_1.EventEmitter();
                    // pager object
                    this.pager = {};
                }
                ngOnInit() {
                    var s = null;
                    this.datePipe = new common_1.DatePipe();
                    this.selCol = 0;
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
                    s.subscribe(clothesItem => this.processResult(clothesItem), error => this.errorMessage = error);
                }
                onSelect(item) {
                    this.selectedItem = item;
                    this.notify.emit(item);
                }
                processResult(clothesItems) {
                    for (var i = 0; i < clothesItems.length; i++) {
                        clothesItems[i].LastWornDateString = this.datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
                    }
                    this.items = clothesItems;
                    this.setPage(1);
                }
                onSelectCol(num) {
                    //same column
                    if (this.selCol != null && this.selCol == num) {
                        this.compareAsc = !this.compareAsc;
                    }
                    else {
                        //new column
                        this.selCol = num;
                        this.compareAsc = true;
                    }
                    this.sortItems(this.compareAsc, num);
                }
                sortItems(compareAsc, num) {
                    if (compareAsc) {
                        this.items = this.sort(this.items);
                    }
                    else {
                        this.items = this.sortDesc(this.items);
                    }
                    this.setPage(1);
                }
                sort(clothesList) {
                    switch (this.selCol) {
                        case 1:
                        default:
                            return clothesList.sort(this.compareDesc);
                        case 2:
                            return clothesList.sort(this.compareShop);
                        case 3:
                            return clothesList.sort(this.compareLast);
                        case 4:
                            return clothesList.sort(this.compareTimes);
                    }
                }
                sortDesc(clothesList) {
                    switch (this.selCol) {
                        case 1:
                        default:
                            return clothesList.sort(this.compareDescAlt);
                        case 2:
                            return clothesList.sort(this.compareShopAlt);
                        case 3:
                            return clothesList.sort(this.compareLastAlt);
                        case 4:
                            return clothesList.sort(this.compareTimesAlt);
                    }
                }
                compareDesc(a, b) {
                    if (a.Description > b.Description)
                        return 1;
                    if (a.Description < b.Description)
                        return -1;
                    return 0;
                }
                compareDescAlt(a, b) {
                    if (a.Description < b.Description)
                        return 1;
                    if (a.Description > b.Description)
                        return -1;
                    return 0;
                }
                compareShop(a, b) {
                    if (a.Shop > b.Shop)
                        return 1;
                    if (a.Shop < b.Shop)
                        return -1;
                    return 0;
                }
                compareShopAlt(a, b) {
                    if (a.Shop < b.Shop)
                        return 1;
                    if (a.Shop > b.Shop)
                        return -1;
                    return 0;
                }
                compareLast(a, b) {
                    if (a.LastWornDate > b.LastWornDate)
                        return 1;
                    if (a.LastWornDate < b.LastWornDate)
                        return -1;
                    return 0;
                }
                compareLastAlt(a, b) {
                    if (a.LastWornDate < b.LastWornDate)
                        return 1;
                    if (a.LastWornDate > b.LastWornDate)
                        return -1;
                    return 0;
                }
                compareTimes(a, b) {
                    if (a.WornCount > b.WornCount)
                        return 1;
                    if (a.WornCount < b.WornCount)
                        return -1;
                    return 0;
                }
                compareTimesAlt(a, b) {
                    if (a.WornCount < b.WornCount)
                        return 1;
                    if (a.WornCount > b.WornCount)
                        return -1;
                    return 0;
                }
                setPage(page) {
                    if (page < 1 || page > this.pager.totalPages) {
                        return;
                    }
                    // get pager object from service
                    this.pager = this.pagerService.getPager(this.items.length, page);
                    // get current page of items..
                    this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
                    templateUrl: "./app/clothes-grid.component.html"
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService, router_1.Router,
                    pager_service_1.PagerService])
            ], ClothesGridComponent);
            exports_1("ClothesGridComponent", ClothesGridComponent);
        }
    };
});
