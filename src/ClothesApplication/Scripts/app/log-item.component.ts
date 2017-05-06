import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { LogItem } from "./log";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";
import { HistoryService } from "./history.service";

@Component({
    selector: "log-item",
    templateUrl: "./app/log-item.component.html"
})

export class LogItemComponent implements OnInit {
    logItem: LogItem;
    errorMessage: string;
    datePipe: DatePipe;
    selectedDate: Date;
    selectedTop: ClothesItem;
    selectedTrousers: ClothesItem;
    selectedShoes: ClothesItem;
    selectedAll: Boolean;
    calendarEntered: Boolean;

    constructor(private clothesService: ClothesService,
        private historyService: HistoryService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.datePipe = new DatePipe();
        this.logItem = new LogItem();
        this.logItem.Id = 0;
        this.logItem.HistoryDate = new Date();
        this.logItem.CreatedDate = new Date();
        this.logItem.LastModifiedDate = new Date();
        this.selectedAll = false;
        this.calendarEntered = false;
     }

    ngOnInit() {
     
    }

    private save() {
        if (this.selectedDate == null)
        {
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

    private onInsert(logItem: LogItem) {
        this.historyService.addLog(logItem).subscribe((data) => {
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
    
    private checkAllSelected()
    {
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

    private dateEntered()
    {
        this.calendarEntered = true;
        this.checkAllSelected();
    }
}