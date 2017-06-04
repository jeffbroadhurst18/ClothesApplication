import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClothesItem } from "./clothes";
import { FileExists } from "./clothes";
import { ClothesService } from "./clothes.service";
import { Category } from "./category";
import { TransformCategoryPipe } from "./clothes-pipe";
import { FilteredHistoryComponent } from "./filtered-history.component";
import { AuthService } from "./auth.service";

@Component({
    selector: "clothes-detail-view",
    templateUrl: "./app/clothes-detail-view.component.html"
})

export class ClothesDetailViewComponent {
    clothesItem: ClothesItem;
    categories: Array<Category>;
    disableSelect: boolean;
    dateLastWorn: string;
    image0: string;
    fileFound: FileExists;

    constructor(private clothesService: ClothesService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.clothesService.getClothesItem(id).subscribe(
                clothesItem => this.processReturn(clothesItem)
            );
        }
        else if (id === 0) {
            console.log("id is 0: switching to edit mode...");
            this.router.navigate(["clothesItem/edit", 0]);
        }
        else {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }
    }

    onItemDetailEdit(clothesItem: ClothesItem) {
        this.router.navigate(["clothesItem/edit", clothesItem.Id]);
        return false;
    }

    processReturn(clothesItem) {
        this.clothesItem = clothesItem;
        var datePipe = new DatePipe();
        this.clothesItem.LastWornDateString = datePipe.transform(this.clothesItem.LastWornDate, 'dd/MM/yyyy');
        this.clothesService.getFileExists(this.clothesItem.Id).subscribe((data) => {
            this.fileFound = data;
            this.image0 = this.fileFound.ItExists ? '/images/' + this.clothesItem.Id + '.jpg' : '/images/noFile.jpg';
        }, (error) => console.log(error)
        );

    }

    onInsert(clothesItem: ClothesItem) {
        this.clothesService.add(clothesItem).subscribe((data) => {
            this.clothesItem = data;
            console.log("Item " + this.clothesItem.Id + " has been added");
            this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onUpdate(clothesItem: ClothesItem) {
        this.clothesService.update(clothesItem).subscribe((data) => {
            this.clothesItem = data;
            console.log("Item " + this.clothesItem.Id + " has been updated");
            this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onDelete(clothesItem: ClothesItem) {
        var id = clothesItem.Id;
        this.clothesService.delete(id).subscribe((data) => {
            console.log("Item " + this.clothesItem.Id + " has been deleted");
            this.router.navigate([""]);
        },
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }
}