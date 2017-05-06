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
        let url: string = this.baseUrl;
        return this.http.post(url, JSON.stringify(logItem),
            this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
    }

    // calls delete
    delete(id: number) {
        let url: string = this.baseUrl + id;
        return this.http.delete(url).catch(this.handleError);
    }

    getHistory() {
        let url: string = this.baseUrl;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getFilteredHistory(itemId: Number, categoryId:Number):Observable<any> {
        let url:string = this.baseUrl + "GetFiltered/" + itemId + "/" + categoryId;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }

    private getRequestOptions(): RequestOptions {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }
}