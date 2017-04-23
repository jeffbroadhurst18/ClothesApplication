System.register(["@angular/core", "@angular/http", "rxjs/Observable"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Observable_1, HistoryService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }
        ],
        execute: function () {
            HistoryService = class HistoryService {
                constructor(http) {
                    this.http = http;
                    this.baseUrl = "api/history/";
                }
                // calls the POST method to add a new Log item
                addLog(logItem) {
                    var url = this.baseUrl;
                    return this.http.post(url, JSON.stringify(logItem), this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
                }
                // Calls Delete
                delete(id) {
                    var url = this.baseUrl + id;
                    return this.http.delete(url).catch(this.handleError);
                }
                getHistory() {
                    var url = this.baseUrl;
                    return this.http.get(url)
                        .map(response => response.json())
                        .catch(this.handleError);
                }
                handleError(error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || "Server Error");
                }
                getRequestOptions() {
                    return new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            "Content-Type": "application/json"
                        })
                    });
                }
            };
            HistoryService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], HistoryService);
            exports_1("HistoryService", HistoryService);
        }
    };
});
