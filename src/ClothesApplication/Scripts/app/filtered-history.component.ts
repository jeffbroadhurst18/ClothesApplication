import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LogItem } from "./log";
import { HistoryService } from "./history.service";
import { Category } from "./category";
import { TransformDatePipe } from "./clothes-pipe";

@Component({
    selector: "filtered-history",
    template: `
   
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <table class="table table-hover table-bordered filteredTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Top</th>
                        <th>Trousers</th>
                        <th>Shoes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let hist of history">
                        <td>{{hist.HistoryDate | transformDate}}</td>
                        <td [class.selected]="categoryId == 1">{{hist.Top}}</td>
                        <td [class.selected]="categoryId == 2">{{hist.Trousers}}</td>
                        <td [class.selected]="categoryId == 3">{{hist.Shoes}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`
})

export class FilteredHistoryComponent implements OnInit {
    @Input() itemId: Number;
    @Input() categoryId: Number;

    history: Array<LogItem>;
    logItem: LogItem;
    errorMessage: string;

    constructor(private router: Router, private historyService: HistoryService) { }

    ngOnInit() {
        this.historyService.getFilteredHistory(this.itemId, this.categoryId).subscribe(
            result => this.history = this.processResult(result),
            error => this.errorMessage = <any>error
        );
    }

    processResult(logItems: Array<LogItem>) {
        return logItems;
    }
}