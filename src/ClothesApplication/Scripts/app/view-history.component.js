System.register(["@angular/core", "@angular/router", "./history.service", "./pager.service"], function (exports_1, context_1) {
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
    var core_1, router_1, history_service_1, pager_service_1, ViewHistoryComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (history_service_1_1) {
                history_service_1 = history_service_1_1;
            },
            function (pager_service_1_1) {
                pager_service_1 = pager_service_1_1;
            }
        ],
        execute: function () {
            ViewHistoryComponent = class ViewHistoryComponent {
                constructor(router, historyService, pagerService) {
                    this.router = router;
                    this.historyService = historyService;
                    this.pagerService = pagerService;
                    // pager object
                    this.pager = {};
                    this.pageSize = 10;
                }
                ngOnInit() {
                    this.historyService.getHistory().subscribe(result => this.processResult(result), error => this.errorMessage = error);
                }
                onSelect(item) {
                    this.selectedItem = item;
                }
                processResult(logItems) {
                    // initialize to page 1
                    this.history = logItems;
                    this.setPage(1);
                }
                deleteLog(item) {
                    this.historyService.delete(item.Id).subscribe((data) => {
                        console.log("Log Item " + item.Id + " has been deleted");
                        this.history = this.history.filter(h => h != item);
                        this.router.navigate(["history"]);
                    }, (error) => console.log(error));
                }
                setPage(page) {
                    if (page < 1 || page > this.pager.totalPages) {
                        return;
                    }
                    // get pager object from service
                    this.pager = this.pagerService.getPager(this.history.length, page, this.pageSize);
                    // get current page of items..
                    this.pagedItems = this.history.slice(this.pager.startIndex, this.pager.endIndex + 1);
                }
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ViewHistoryComponent.prototype, "class", void 0);
            ViewHistoryComponent = __decorate([
                core_1.Component({
                    selector: "history",
                    templateUrl: "./app/view-history.component.html"
                }),
                __metadata("design:paramtypes", [router_1.Router, history_service_1.HistoryService, pager_service_1.PagerService])
            ], ViewHistoryComponent);
            exports_1("ViewHistoryComponent", ViewHistoryComponent);
        }
    };
});
