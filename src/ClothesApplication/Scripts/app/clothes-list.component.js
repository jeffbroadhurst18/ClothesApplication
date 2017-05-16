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
    var core_1, router_1, clothes_service_1, pager_service_1, common_1, ClothesListComponent;
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
            ClothesListComponent = class ClothesListComponent {
                constructor(clothesService, router, pagerService) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.pagerService = pagerService;
                    // pager object
                    this.pager = {};
                }
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
                    s.subscribe(result => this.processResult(result), error => this.errorMessage = error);
                }
                onSelect(item) {
                    this.selectedItem = item;
                    this.router.navigate(['clothesItem/view', this.selectedItem.Id]);
                }
                processResult(clothesItems) {
                    var datePipe = new common_1.DatePipe();
                    for (var i = 0; i < clothesItems.length; i++) {
                        clothesItems[i].LastWornDateString = datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
                    }
                    this.clothes = clothesItems;
                    this.setPage(1);
                }
                setPage(page) {
                    if (page < 1 || page > this.pager.totalPages) {
                        return;
                    }
                    // get pager object from service
                    this.pager = this.pagerService.getPager(this.clothes.length, page);
                    // get current page of items..
                    this.pagedItems = this.clothes.slice(this.pager.startIndex, this.pager.endIndex + 1);
                }
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ClothesListComponent.prototype, "class", void 0);
            ClothesListComponent = __decorate([
                core_1.Component({
                    selector: "clothes-list",
                    templateUrl: "./app/clothes-list.component.html"
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService, router_1.Router,
                    pager_service_1.PagerService])
            ], ClothesListComponent);
            exports_1("ClothesListComponent", ClothesListComponent);
        }
    };
});
