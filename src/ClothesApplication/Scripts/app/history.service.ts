import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { LogItem } from "./log";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HistoryService {
    constructor(private http: Http) {
    }

    private baseUrl = "api/history/";

    // calls the POST method to add a new Log item
    addLog(logItem: LogItem) {
        var url = this.baseUrl;
        return this.http.post(url, JSON.stringify(logItem),
            this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
    }

    // Calls Delete
    delete(id: number) {
        var url = this.baseUrl + id;
        return this.http.delete(url).catch(this.handleError);
    }

    getHistory() {
        var url = this.baseUrl;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }

    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }
}