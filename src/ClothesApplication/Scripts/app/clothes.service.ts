import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ClothesItem } from "./clothes";
import { Category } from "./category";

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

    getCategoryItems(num?: number) {
        var url = this.baseUrl + "GetType/";
        if (num != null) { url += num; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.HandleError);
    }

    getCategoryItem(id?: number) {
        var url = this.baseUrl + "Get/";
        if (id != null) { url += id; }
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.HandleError);
    }

    getCategoryName(id : number) {
        return this.categories[id - 1].name;
    }

    HandleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }
}
