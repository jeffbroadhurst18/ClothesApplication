import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LogItem } from "./log";
import { HistoryService } from "./history.service";
import { PagerService } from "./pager.service";
import { Category } from "./category";
import { TransformDatePipe } from "./clothes-pipe";

@Component({
    selector: "history",
    templateUrl: "./app/view-history.component.html"
})

export class ViewHistoryComponent implements OnInit {
    @Input() class: string;
    
    history: Array<LogItem>;
    logItem: LogItem;
    errorMessage: string;
    selectedItem: LogItem;
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private router: Router, private historyService: HistoryService, private pagerService: PagerService) { }

    ngOnInit() {
            this.historyService.getHistory().subscribe(
            result => this.processResult(result),
            error => this.errorMessage = <any>error
        );
    }

    onSelect(item: LogItem) {
        this.selectedItem = item;
    }

    processResult(logItems: Array<LogItem>) {
        // initialize to page 1
        this.history = logItems;
        this.setPage(1);
    }

    deleteLog(item: LogItem)
    {
        this.historyService.delete(item.Id).subscribe((data) => {
            console.log("Log Item " + item.Id + " has been deleted");
            this.history = this.history.filter(h => h != item)
            this.router.navigate(["history"]);
        },
            (error) => console.log(error)
        );
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.history.length, page);

        // get current page of items..
        this.pagedItems = this.history.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}