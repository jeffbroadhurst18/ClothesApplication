import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Router } from "@angular/router";
import { LogItem } from "./log";
import { LogService } from "./log.service";
import { Category } from "./category";
import { DatePipe } from "@angular/common";

@Component({
    selector: "history",
    template: `
    <h3>{{title}}</h3>
    <table class="items">
        <tr *ngFor="let hist of history"
            [class.selected]="hist === selectedItem"
            (click)="onSelect(hist)">
            <td>{{hist.HistoryDate}}</td>
            <td>{{hist.Top}}</td>
            <td>{{hist.Trousers}}</td>
            <td>{{hist.Shoes}}</td>
        </tr>
    </table>
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