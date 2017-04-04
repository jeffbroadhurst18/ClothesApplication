System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "./app-routing", "rxjs/Rx", "@angular/forms", "@angular/router", "./app.component", "./clothes-list.component", "./clothes-detail-view.component", "./clothes-detail-edit.component", "./home.component", "./clothes.service", "./clothes-pipe"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, app_routing_1, forms_1, router_1, app_component_1, clothes_list_component_1, clothes_detail_view_component_1, clothes_detail_edit_component_1, home_component_1, clothes_service_1, clothes_pipe_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (_1) {
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (clothes_list_component_1_1) {
                clothes_list_component_1 = clothes_list_component_1_1;
            },
            function (clothes_detail_view_component_1_1) {
                clothes_detail_view_component_1 = clothes_detail_view_component_1_1;
            },
            function (clothes_detail_edit_component_1_1) {
                clothes_detail_edit_component_1 = clothes_detail_edit_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            },
            function (clothes_pipe_1_1) {
                clothes_pipe_1 = clothes_pipe_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    declarations: [app_component_1.AppComponent, clothes_list_component_1.ClothesListComponent, clothes_detail_view_component_1.ClothesDetailViewComponent, clothes_detail_edit_component_1.ClothesDetailEditComponent, home_component_1.HomeComponent, clothes_pipe_1.TransformCategoryPipe],
                    imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_1.AppRouting, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule],
                    providers: [clothes_service_1.ClothesService],
                    bootstrap: [app_component_1.AppComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
