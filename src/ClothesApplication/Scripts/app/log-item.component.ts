import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { LogItem } from "./log";
import { ClothesItem } from "./clothes";
import { ClothesService } from "./clothes.service";

@Component({
    selector: "log-item",
    template: `
<div class="container-fluid">
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-4">
            <div class="container-fluid">
                <div class="row">
                    <h3>Store daily outfit</h3>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="historyDate" class="historyDate">Date:</label>
                        <input type="date" [(ngModel)]="selectedDate" name="historyDate" />
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-4">
            <div class="container-fluid">
                <div class="row">
                    <h3>Selected Items</h3>
                </div>
                <div class="row">
                    <div>Top: <span *ngIf="selectedTop">{{selectedTop.Description}}</span></div>
                </div>
                <div class="row">
                    <div>Trousers: <span *ngIf="selectedTrousers">{{selectedTrousers.Description}}</span></div>
                </div>
                <div class="row">
                    <div>Shoes: <span *ngIf="selectedShoes">{{selectedShoes.Description}}</span></div>
                </div>
                <div class="row">
                    <button [disabled]="!selectedAll" (click)="save()">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row itemsTitle">
       <div class="col-md-4">         
        <h2 class="topsTitle">Tops</h2>
       </div>
       <div class="col-md-4">         
        <h2 class="trousersTitle">Trousers</h2>
       </div>
       <div class="col-md-4">         
        <h2 class="shoesTitle">Shoes</h2>
       </div>
    </div>
    <div class="row">
        <clothes-grid class="tops" (notify)="onNotifyTop($event)"></clothes-grid>        
        <clothes-grid class="trousers" (notify)="onNotifyTrousers($event)"></clothes-grid>        
        <clothes-grid class="shoes" (notify)="onNotifyShoes($event)"></clothes-grid>        
    </div>
</div>
`
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
        this.selectedAll = false;
     }

    ngOnInit() {
     
    }

    private save() {
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
        if (this.selectedDate == null) {
            this.selectedAll = false;
            return;
        }
        this.selectedAll = true;
    }
}