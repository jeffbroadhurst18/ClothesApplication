import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LogItem } from "./log";
import { HistoryService } from "./history.service";
import { Category } from "./category";
import { TransformDatePipe } from "./clothes-pipe";

@Component({
    selector: "filtered-history",
    templateUrl: "./app/filtered-history.component.html"
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