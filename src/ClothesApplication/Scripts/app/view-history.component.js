System.register(["@angular/core", "@angular/router", "./log.service"], function (exports_1, context_1) {
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
    var core_1, router_1, log_service_1, ViewHistoryComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (log_service_1_1) {
                log_service_1 = log_service_1_1;
            }
        ],
        execute: function () {
            ViewHistoryComponent = class ViewHistoryComponent {
                constructor(logService, router) {
                    this.logService = logService;
                    this.router = router;
                }
                ngOnInit() {
                    this.logService.getHistory().subscribe(result => this.history = this.processResult(result), error => this.errorMessage = error);
                }
                onSelect(item) {
                    this.selectedItem = item;
                }
                processResult(logItems) {
                    return logItems;
                }
            };
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ViewHistoryComponent.prototype, "class", void 0);
            ViewHistoryComponent = __decorate([
                core_1.Component({
                    selector: "history",
                    template: `
   <h3>{{title}}</h3>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <ul class="items historyItems">
                <li>
                    <div>Date</div>
                    <div>Top</div>
                    <div>Trousers</div>
                    <div>Shoes</div>
                </li>
                <li *ngFor="let hist of history"
                    [class.selected]="hist === selectedItem"
                    (click)="onSelect(hist)">
                    <div>{{hist.HistoryDate | transformDate}}</div>
                    <div>{{hist.Top}}</div>
                    <div>{{hist.Trousers}}</div>
                    <div>{{hist.Shoes}}</div>
                </li>
            </ul>
        </div>
    </div>
</div>
`
                }),
                __metadata("design:paramtypes", [log_service_1.LogService, router_1.Router])
            ], ViewHistoryComponent);
            exports_1("ViewHistoryComponent", ViewHistoryComponent);
        }
    };
});
