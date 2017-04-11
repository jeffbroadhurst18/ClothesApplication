System.register(["@angular/core", "@angular/router", "@angular/common", "./log", "./clothes.service"], function (exports_1, context_1) {
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
    var core_1, router_1, common_1, log_1, clothes_service_1, LogItemComponent;
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
            }
        ],
        execute: function () {
            LogItemComponent = class LogItemComponent {
                constructor(clothesService, router, activatedRoute) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.datePipe = new common_1.DatePipe();
                    this.logItem = new log_1.LogItem();
                    this.logItem.Id = 0;
                    this.logItem.HistoryDate = new Date();
                    this.logItem.CreatedDate = new Date();
                    this.logItem.LastModifiedDate = new Date();
                }
                ngOnInit() {
                    this.clothesService.getClothesItemsByType(1).subscribe(clothesItem => this.tops = this.processResult(clothesItem), error => this.errorMessage = error);
                    this.clothesService.getClothesItemsByType(2).subscribe(clothesItem => this.trousers = this.processResult(clothesItem), error => this.errorMessage = error);
                    this.clothesService.getClothesItemsByType(3).subscribe(clothesItem => this.shoes = this.processResult(clothesItem), error => this.errorMessage = error);
                }
                processResult(clothesItems) {
                    for (var i = 0; i < clothesItems.length; i++) {
                        clothesItems[i].LastWornDateString = this.datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
                    }
                    return clothesItems;
                }
                onInsert(logItem) {
                    this.clothesService.addLog(logItem).subscribe((data) => {
                        this.logItem = data;
                        console.log("Item " + this.logItem.Id + " has been added");
                        this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onBack() {
                    this.router.navigate([""]);
                }
            };
            LogItemComponent = __decorate([
                core_1.Component({
                    selector: "log-item",
                    template: `
            <div class="item-container">
    <div class="panel panel-default">
        <div class="panel-body">
            <form class="item-detail-edit">
                <div class="form-group">
                    <label for="historyDate">Top</label>
                    <div class="form-control">
                        <input type="date" [(ngModel)]="logItem.HistoryDate" name="historyDate"/>
                    </div> 
                    <label for="top">Top</label>
                    <select id="top" name="input-top" required [(ngModel)]="logItem.TopId" class="form-control">
                        <option *ngFor="let top of tops" [ngValue]="top.Id">{{top.Description}} - Worn {{top.WornCount}} times - Last Worn {{top.LastWornDateString}}</option>
                    </select>
                    <label for="trousers">Trousers</label>
                    <select id="top" name="input-trousers" required [(ngModel)]="logItem.TrousersId" class="form-control">
                        <option *ngFor="let trouser of trousers" [ngValue]="trouser.Id">{{trouser.Description}} - Worn {{trouser.WornCount}} times - Last Worn {{trouser.LastWornDateString}}</option>
                    </select>
                    <label for="shoes">Shoes</label>
                    <select id="top" name="input-shoes" required [(ngModel)]="logItem.ShoesId" class="form-control">
                        <option *ngFor="let shoe of shoes" [ngValue]="shoe.Id">{{shoe.Description}} - Worn {{shoe.WornCount}} times - Last Worn {{shoe.LastWornDateString}}</option>
                    </select>
                </div>
                <div class="commands insert">
                    <input type="button" value="Save" class="btn btn-primary" (click)="onInsert(logItem)" />
                    <input type="button" value="Cancel" class="btn btn-default" (click)="onBack()" />
                </div>
            </form>
        </div>
    </div>
</div>
`
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService,
                    router_1.Router,
                    router_1.ActivatedRoute])
            ], LogItemComponent);
            exports_1("LogItemComponent", LogItemComponent);
        }
    };
});
