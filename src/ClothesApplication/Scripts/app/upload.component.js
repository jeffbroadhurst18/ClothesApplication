System.register(["@angular/core", "@angular/common", "@angular/http", "rxjs/Observable", "./clothes.service"], function (exports_1, context_1) {
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
    var core_1, common_1, http_1, Observable_1, clothes_service_1, UploadComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            }
        ],
        execute: function () {
            UploadComponent = class UploadComponent {
                constructor(http, clothesService) {
                    this.http = http;
                    this.clothesService = clothesService;
                    this.baseUrl = 'api/clothes/UploadFiles';
                }
                ngOnInit() {
                    this.clothesService.getClothesItemsByType(1).subscribe(result => this.processResult(result), error => this.errorMessage = error);
                }
                processResult(clothesItems) {
                    var datePipe = new common_1.DatePipe();
                    for (var i = 0; i < clothesItems.length; i++) {
                        clothesItems[i].LastWornDateString = datePipe.transform(clothesItems[i].LastWornDate, 'dd/MM/yyyy');
                    }
                    this.clothes = clothesItems;
                }
                fileChange(event) {
                    let fileList = event.target.files;
                    this.apiUrl = this.baseUrl + '/' + this.selectedItem;
                    if (fileList.length > 0) {
                        let file = fileList[0];
                        let formData = new FormData();
                        formData.append('files', file, file.name);
                        let headers = new http_1.Headers();
                        headers.append('enctype', 'multipart/form-data');
                        headers.append('Accept', 'application/json');
                        let options = new http_1.RequestOptions({ headers: headers });
                        this.http.post(this.apiUrl, formData, options)
                            .map(res => res.json())
                            .catch(error => Observable_1.Observable.throw(error))
                            .subscribe(data => console.log('success'), error => console.log(error));
                    }
                }
            };
            UploadComponent = __decorate([
                core_1.Component({
                    selector: "upload",
                    templateUrl: "./app/upload.component.html"
                }),
                __metadata("design:paramtypes", [http_1.Http, clothes_service_1.ClothesService])
            ], UploadComponent);
            exports_1("UploadComponent", UploadComponent);
        }
    };
});
