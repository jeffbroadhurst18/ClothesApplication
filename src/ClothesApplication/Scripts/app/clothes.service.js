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
    var core_1, http_1, Observable_1, ClothesService;
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
            ClothesService = class ClothesService {
                constructor(http) {
                    this.http = http;
                    this.baseUrl = "api/clothes/";
                    this.categories = new Array();
                }
                getCategories() {
                    let cats = new Array();
                    cats = [{ id: 1, name: "Tops" }, { id: 2, name: "Trousers" }, { id: 3, name: "Shoes" }];
                    this.categories = cats;
                    return cats;
                }
                getClothesItemsByType(num) {
                    let url = this.baseUrl + "GetType/";
                    if (num != null) {
                        url += num;
                    }
                    return this.http.get(url)
                        .map(response => response.json())
                        .catch(this.handleError);
                }
                getClothesItem(id) {
                    let url = this.baseUrl;
                    if (id != null) {
                        url += id;
                    }
                    return this.http.get(url)
                        .map(response => response.json())
                        .catch(this.handleError);
                }
                getCategoryName(id) {
                    return this.categories[id - 1].name;
                }
                getFileExists(id) {
                    let url = this.baseUrl + "/getFile/" + id;
                    return this.http.get(url)
                        .map(response => response.json()).catch(this.handleError);
                }
                // calls the POST method to add a new item
                add(clothesItem) {
                    let url = this.baseUrl;
                    return this.http.post(url, JSON.stringify(clothesItem), this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
                }
                // calls the PUT method to update an existing item
                update(clothesItem) {
                    let url = this.baseUrl + clothesItem.Id;
                    return this.http.put(url, JSON.stringify(clothesItem), this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
                }
                // calls celete
                delete(id) {
                    let url = this.baseUrl + id;
                    return this.http.delete(url).catch(this.handleError);
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
            ClothesService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], ClothesService);
            exports_1("ClothesService", ClothesService);
        }
    };
});
