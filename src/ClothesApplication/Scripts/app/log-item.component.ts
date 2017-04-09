import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { LogItem } from "./log";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
//import { DatepickerModule } from "ng2-bootstrap";
//import * as moment from "moment";

@Component({
    selector: "log-item",
    template: `
            <div class="item-container">
    <div class="panel panel-default">
        <div class="panel-body">
            <form class="item-detail-edit">
                <div class="form-group">
                    <div class="form-control">
                        <datepicker [(ngModel)]="logItem.HistoryDate"
                                    [showWeeks]="true"
                                    [minDate]="minDate"
                                    [dateDisabled]="disabledDate"
                                    [onlyCurrentMonth]=false></datepicker>

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

})

export class LogItemComponent implements OnInit {
    logItem: LogItem;
    tops: Array<ClothesItem>;
    trousers: Array<ClothesItem>;
    shoes: Array<ClothesItem>;
    errorMessage: string;
    datePipe: DatePipe;
    minDate: Date;
    disabledDate: { dt: Date, mode: string };

    constructor(private clothesService: ClothesService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.datePipe = new DatePipe();
        this.logItem = new LogItem();
        this.logItem.Id = 0;
        this.logItem.HistoryDate = new Date();
        this.logItem.CreatedDate = new Date();
        this.logItem.LastModifiedDate = new Date();
        this.minDate = new Date(2017, 1, 1);
     }

    ngOnInit() {
        this.clothesService.getClothesItemsByType(1).subscribe(
            clothesItem => this.tops = this.processResult(clothesItem),
            error => this.errorMessage = <any>error);

        this.clothesService.getClothesItemsByType(2).subscribe(
            clothesItem => this.trousers = this.processResult(clothesItem),
            error => this.errorMessage = <any>error);

        this.clothesService.getClothesItemsByType(3).subscribe(
            clothesItem => this.shoes = this.processResult(clothesItem),
            error => this.errorMessage = <any>error);
    }

    processResult(clothesItems: ClothesItem[])
    {
        for (var i = 0; i < clothesItems.length; i++)
        {
            clothesItems[i].LastWornDateString = this.datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
        }
        return clothesItems;
    }

    onInsert(logItem: LogItem) {
        this.clothesService.addLog(logItem).subscribe((data) => {
            this.logItem = data;
            console.log("Item " + this.logItem.Id + " has been added");
            this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }
}