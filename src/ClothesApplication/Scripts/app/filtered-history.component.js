System.register(["@angular/core", "@angular/router", "./history.service"], function (exports_1, context_1) {
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
    var core_1, router_1, history_service_1, FilteredHistoryComponent;
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
            }
        ],
        execute: function () {
            FilteredHistoryComponent = class FilteredHistoryComponent {
                constructor(router, historyService) {
                    this.router = router;
                    this.historyService = historyService;
                }
                ngOnInit() {
                    this.historyService.getFilteredHistory(this.itemId, this.categoryId).subscribe(result => this.history = this.processResult(result), error => this.errorMessage = error);
                }
                processResult(logItems) {
                    return logItems;
                }
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", Number)
            ], FilteredHistoryComponent.prototype, "itemId", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Number)
            ], FilteredHistoryComponent.prototype, "categoryId", void 0);
            FilteredHistoryComponent = __decorate([
                core_1.Component({
                    selector: "filtered-history",
                    templateUrl: "./app/filtered-history.component.html"
                }),
                __metadata("design:paramtypes", [router_1.Router, history_service_1.HistoryService])
            ], FilteredHistoryComponent);
            exports_1("FilteredHistoryComponent", FilteredHistoryComponent);
        }
    };
});
