import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { LogItem } from "./log";

@Injectable()
export class LogService {
    constructor(private http: Http) {

    }

    private baseUrl = "api/history/";
    
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
}