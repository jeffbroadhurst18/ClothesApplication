System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "./app-routing", "./auth.service", "./auth.http", "rxjs/Rx", "@angular/forms", "@angular/router", "./app.component", "./clothes-list.component", "./clothes-detail-view.component", "./clothes-detail-edit.component", "./clothes-grid.component", "./log-item.component", "./home.component", "./view-history.component", "./filtered-history.component", "./upload.component", "./clothes.service", "./history.service", "./pager.service", "./clothes-pipe"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, app_routing_1, auth_service_1, auth_http_1, forms_1, router_1, app_component_1, clothes_list_component_1, clothes_detail_view_component_1, clothes_detail_edit_component_1, clothes_grid_component_1, log_item_component_1, home_component_1, view_history_component_1, filtered_history_component_1, upload_component_1, clothes_service_1, history_service_1, pager_service_1, clothes_pipe_1, clothes_pipe_2, AppModule;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (auth_http_1_1) {
                auth_http_1 = auth_http_1_1;
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
            function (clothes_grid_component_1_1) {
                clothes_grid_component_1 = clothes_grid_component_1_1;
            },
            function (log_item_component_1_1) {
                log_item_component_1 = log_item_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (view_history_component_1_1) {
                view_history_component_1 = view_history_component_1_1;
            },
            function (filtered_history_component_1_1) {
                filtered_history_component_1 = filtered_history_component_1_1;
            },
            function (upload_component_1_1) {
                upload_component_1 = upload_component_1_1;
            },
            function (clothes_service_1_1) {
                clothes_service_1 = clothes_service_1_1;
            },
            function (history_service_1_1) {
                history_service_1 = history_service_1_1;
            },
            function (pager_service_1_1) {
                pager_service_1 = pager_service_1_1;
            },
            function (clothes_pipe_1_1) {
                clothes_pipe_1 = clothes_pipe_1_1;
                clothes_pipe_2 = clothes_pipe_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_1.NgModule({
                    declarations: [app_component_1.AppComponent, clothes_list_component_1.ClothesListComponent, clothes_detail_view_component_1.ClothesDetailViewComponent,
                        clothes_detail_edit_component_1.ClothesDetailEditComponent, clothes_grid_component_1.ClothesGridComponent, home_component_1.HomeComponent, log_item_component_1.LogItemComponent,
                        view_history_component_1.ViewHistoryComponent, filtered_history_component_1.FilteredHistoryComponent, upload_component_1.UploadComponent, clothes_pipe_1.TransformCategoryPipe, clothes_pipe_2.TransformDatePipe],
                    imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_1.AppRouting, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule],
                    providers: [clothes_service_1.ClothesService, history_service_1.HistoryService, pager_service_1.PagerService, auth_service_1.AuthService, auth_http_1.AuthHttp],
                    bootstrap: [app_component_1.AppComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
