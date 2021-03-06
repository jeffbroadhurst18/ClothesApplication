System.register(["@angular/core", "@angular/router", "@angular/common", "./log", "./clothes.service", "./history.service", "./auth.service"], function (exports_1, context_1) {
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
    var core_1, router_1, common_1, log_1, clothes_service_1, history_service_1, auth_service_1, LogItemComponent;
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
            function (log_1_1) {
                log_1 = log_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            },
            function (history_service_1_1) {
                history_service_1 = history_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            LogItemComponent = class LogItemComponent {
                constructor(clothesService, historyService, router, activatedRoute, authService) {
                    this.clothesService = clothesService;
                    this.historyService = historyService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.authService = authService;
                    if (this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.datePipe = new common_1.DatePipe();
                    this.logItem = new log_1.LogItem();
                    this.logItem.Id = 0;
                    this.logItem.HistoryDate = new Date();
                    this.logItem.CreatedDate = new Date();
                    this.logItem.LastModifiedDate = new Date();
                    this.selectedAll = false;
                    this.calendarEntered = false;
                }
                ngOnInit() {
                }
                save() {
                    if (this.selectedDate == null) {
                        alert("Ensure date has been completed");
                        return;
                    }
                    this.logItem.TopId = this.selectedTop.Id;
                    this.logItem.TrousersId = this.selectedTrousers.Id;
                    this.logItem.ShoesId = this.selectedShoes.Id;
                    this.logItem.HistoryDate = this.selectedDate;
                    this.onInsert(this.logItem);
                    this.selectedTop = null;
                    this.selectedTrousers = null;
                    this.selectedShoes = null;
                    this.selectedAll = false;
                }
                onInsert(logItem) {
                    this.historyService.addLog(logItem).subscribe((data) => {
                        this.logItem = data;
                        console.log("Item " + this.logItem.Id + " has been added");
                        this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onBack() {
                    this.router.navigate([""]);
                }
                onNotifyTop(event) {
                    this.selectedTop = event;
                    this.checkAllSelected();
                }
                onNotifyTrousers(event) {
                    this.selectedTrousers = event;
                    this.checkAllSelected();
                }
                onNotifyShoes(event) {
                    this.selectedShoes = event;
                    this.checkAllSelected();
                }
                checkAllSelected() {
                    if (this.selectedTop == null) {
                        this.selectedAll = false;
                        return;
                    }
                    if (this.selectedTrousers == null) {
                        this.selectedAll = false;
                        return;
                    }
                    if (this.selectedShoes == null) {
                        this.selectedAll = false;
                        return;
                    }
                    if (this.calendarEntered == false) {
                        this.selectedAll = false;
                        return;
                    }
                    this.selectedAll = true;
                }
                dateEntered() {
                    this.calendarEntered = true;
                    this.checkAllSelected();
                }
            };
            LogItemComponent = __decorate([
                core_1.Component({
                    selector: "log-item",
                    templateUrl: "./app/log-item.component.html"
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService,
                    history_service_1.HistoryService,
                    router_1.Router,
                    router_1.ActivatedRoute,
                    auth_service_1.AuthService])
            ], LogItemComponent);
            exports_1("LogItemComponent", LogItemComponent);
        }
    };
});
