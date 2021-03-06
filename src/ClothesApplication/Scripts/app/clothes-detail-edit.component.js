System.register(["@angular/core", "@angular/router", "@angular/common", "@angular/http", "./clothes", "./clothes.service", "./auth.service"], function (exports_1, context_1) {
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
    var core_1, router_1, common_1, http_1, clothes_1, clothes_service_1, auth_service_1, ClothesDetailEditComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (clothes_1_1) {
                clothes_1 = clothes_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            ClothesDetailEditComponent = class ClothesDetailEditComponent {
                constructor(clothesService, router, activatedRoute, http, authService) {
                    this.clothesService = clothesService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.http = http;
                    this.authService = authService;
                    if (this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.baseUrl = 'api/clothes/UploadFiles';
                    this.swapper = true;
                }
                ngOnInit() {
                    this.disableSelect = true;
                    var id = +this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.clothesService.getClothesItem(id).subscribe(clothesItem => this.processReturn(clothesItem));
                    }
                    else if (id === 0) {
                        console.log("id is 0: adding a new item...");
                        this.clothesItem = new clothes_1.ClothesItem(0, 0, "", "", new Date(2000, 0, 1), "01/01/2000", 0, new Date(2000, 0, 1), new Date(2000, 0, 1));
                    }
                    else {
                        console.log("Invalid id: routing back to home");
                        this.router.navigate([""]);
                    }
                    this.categories = this.clothesService.getCategories();
                    this.errorMessage = "";
                }
                onItemDetailView(clothesItem) {
                    this.router.navigate(["clothesItem/view", clothesItem.Id]);
                    return false;
                }
                processReturn(clothesItem) {
                    this.clothesItem = clothesItem;
                    var datePipe = new common_1.DatePipe();
                    this.clothesItem.LastWornDateString = datePipe.transform(this.clothesItem.LastWornDate, 'dd/MM/yyyy');
                    this.checkIfFileExists(this.clothesItem.Id);
                }
                checkIfFileExists(id) {
                    this.clothesService.getFileExists(id).subscribe((data) => {
                        this.fileFound = data;
                        this.image0 = this.fileFound.ItExists ? '/images/' + id + '.jpg' + '?' + new Date().getTime() : '/images/noFile.jpg' + '?' + new Date().getTime();
                    }, (error) => console.log(error));
                }
                onInsert(clothesItem) {
                    this.clothesService.add(clothesItem).subscribe((data) => {
                        this.clothesItem = data;
                        console.log("Item " + this.clothesItem.Id + " has been added");
                        //  this.router.navigate([""]);
                    }, (error) => console.log(error));
                }
                onUpdate(clothesItem) {
                    this.clothesService.update(clothesItem).subscribe((data) => {
                        this.errorMessage = "";
                        this.clothesItem = data;
                        console.log("Item " + this.clothesItem.Id + " has been updated.");
                        this.router.navigate(["clothesItem/view", clothesItem.Id]);
                    }, (error) => console.log(error));
                }
                onDelete(clothesItem) {
                    let id = clothesItem.Id;
                    this.errorMessage = "";
                    this.clothesService.delete(id).subscribe((data) => {
                        console.log("Item " + this.clothesItem.Id + " has been deleted");
                        this.router.navigate([""]);
                    }, (error) => this.displayError(error, id));
                }
                displayError(error, id) {
                    console.log("Error deleting clothesItem with id = " + id.toString());
                    this.errorMessage = "The value could not be deleted. Item may be used in a history record.";
                }
                onBack() {
                    this.router.navigate([""]);
                }
                fileChange(event) {
                    let fileList = event.target.files;
                    let itemId = this.clothesItem != null ? this.clothesItem.Id : 0;
                    this.apiUrl = this.baseUrl + '/' + itemId;
                    this.clothesService.savePicture(fileList, itemId, this.apiUrl).subscribe(data => this.processFileChange(), error => console.log(error));
                }
                processFileChange() {
                    console.log('Save Picture - success');
                    this.checkIfFileExists(this.clothesItem.Id);
                }
            };
            ClothesDetailEditComponent = __decorate([
                core_1.Component({
                    selector: "clothes-detail-edit",
                    templateUrl: "./app/clothes-detail-edit.component.html"
                }),
                __metadata("design:paramtypes", [clothes_service_1.ClothesService,
                    router_1.Router,
                    router_1.ActivatedRoute,
                    http_1.Http,
                    auth_service_1.AuthService])
            ], ClothesDetailEditComponent);
            exports_1("ClothesDetailEditComponent", ClothesDetailEditComponent);
        }
    };
});
