import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ClothesItem } from "./clothes";
import { Category } from "./category";
import { LogItem } from "./log";

@Injectable()
export class ClothesService {
    constructor(private http: Http) {

    }

    private baseUrl = "api/clothes/";
    private categories = new Array<Category>();

    getCategories(): Category[] {
        var cats = new Array<Category>();
        cats = [{ id: 1, name: "Tops" }, { id: 2, name: "Trousers" }, { id: 3, name: "Shoes" }];
        this.categories = cats;
        return cats;
    }

    getClothesItemsByType(num?: number) {
        var url = this.baseUrl + "GetType/";
        if (num != null) { url += num; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    getClothesItem(id?: number) {
        var url = this.baseUrl;
        if (id != null) { url += id; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCategoryName(id: number) {
        return this.categories[id - 1].name;
    }

    // calls the POST method to add a new item
    add(clothesItem: ClothesItem) {
        var url = this.baseUrl;
        return this.http.post(url, JSON.stringify(clothesItem),
            this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
    }

    // calls the POST method to add a new Log item
    addLog(logItem: LogItem) {
        var url = this.baseUrl + "AddLog/";
        return this.http.post(url, JSON.stringify(logItem),
            this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
    }

    // calls the PUT method to update an existing item
    update(clothesItem: ClothesItem)
    {
        var url = this.baseUrl + clothesItem.Id;
        return this.http.put(url, JSON.stringify(clothesItem),
            this.getRequestOptions()).map(response => response.json()).catch(this.handleError);
    }

    // Calls Delete
    delete(id: number) {
        var url = this.baseUrl + id;
        return this.http.delete(url).catch(this.handleError);
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
