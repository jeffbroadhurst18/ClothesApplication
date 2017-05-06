import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LogItem } from "./log";
import { HistoryService } from "./history.service";
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

    constructor(private router: Router, private historyService: HistoryService) { }

    ngOnInit() {
            this.historyService.getHistory().subscribe(
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
}