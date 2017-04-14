import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LogItem } from "./log";
import { LogService } from "./log.service";
import { Category } from "./category";
import { TransformDatePipe } from "./clothes-pipe";

@Component({
    selector: "history",
    template: `
   
<div class="container-fluid">
<div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <h3>History</h3>
        </div>
</div>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <table class="table table-hover table-bordered historyTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Top</th>
                        <th>Trousers</th>
                        <th>Shoes</th>
                </thead>
                <tbody>
                    <tr *ngFor="let hist of history"
                        [class.selected]="hist === selectedItem"
                        (click)="onSelect(hist)">
                        <td>{{hist.HistoryDate | transformDate}}</td>
                        <td>{{hist.Top}}</td>
                        <td>{{hist.Trousers}}</td>
                        <td>{{hist.Shoes}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`  
})

export class ViewHistoryComponent implements OnInit {
    @Input() class: string;
    
    history: Array<LogItem>;
    logItem: LogItem;
    errorMessage: string;
    selectedItem: LogItem;

    constructor(private logService: LogService, private router: Router) { }

    ngOnInit() {
            this.logService.getHistory().subscribe(
            result => this.history = this.processResult(result),
            error => this.errorMessage = <any>error
        );
    }

    onSelect(item: LogItem) {
        this.selectedItem = item;
    }

    processResult(logItems: Array<LogItem>) {
        return logItems;
    }
}