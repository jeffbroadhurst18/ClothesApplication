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
                    var cats = new Array();
                    cats = [{ id: 1, name: "Tops" }, { id: 2, name: "Trousers" }, { id: 3, name: "Shoes" }];
                    this.categories = cats;
                    return cats;
                }
                getCategoryItems(num) {
                    var url = this.baseUrl + "GetType/";
                    if (num != null) {
                        url += num;
                    }
                    return this.http.get(url)
                        .map(response => response.json())
                        .catch(this.HandleError);
                }
                getSingle(id) {
                    var url = this.baseUrl + "Get/";
                    if (id != null) {
                        url += id;
                    }
                    return this.http.get(url)
                        .map(response => response.json())
                        .catch(this.HandleError);
                }
                getCategoryName(id) {
                    return this.categories[id - 1].name;
                }
                HandleError(error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || "Server Error");
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
