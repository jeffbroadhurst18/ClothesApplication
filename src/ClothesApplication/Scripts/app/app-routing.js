System.register(["@angular/router", "./clothes-detail-view.component", "./clothes-detail-edit.component", "./home.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, clothes_detail_view_component_1, clothes_detail_edit_component_1, home_component_1, appRoutes, AppRoutingProviders, AppRouting;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (clothes_detail_view_component_1_1) {
                clothes_detail_view_component_1 = clothes_detail_view_component_1_1;
            },
            function (clothes_detail_edit_component_1_1) {
                clothes_detail_edit_component_1 = clothes_detail_edit_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                {
                    path: "",
                    component: home_component_1.HomeComponent
                },
                {
                    path: "home",
                    redirectTo: ""
                },
                {
                    path: "clothesItem/edit/:id",
                    component: clothes_detail_edit_component_1.ClothesDetailEditComponent
                },
                {
                    path: "clothesItem/view/:id",
                    component: clothes_detail_view_component_1.ClothesDetailViewComponent
                },
            ];
            exports_1("AppRoutingProviders", AppRoutingProviders = []);
            exports_1("AppRouting", AppRouting = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
