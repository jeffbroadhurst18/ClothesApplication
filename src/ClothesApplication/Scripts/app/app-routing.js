System.register(["@angular/router", "./clothes-list.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, clothes_list_component_1, appRoutes, AppRoutingProviders, AppRouting;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (clothes_list_component_1_1) {
                clothes_list_component_1 = clothes_list_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                {
                    path: "",
                    component: clothes_list_component_1.ClothesListComponent
                },
                {
                    path: "clothes-list",
                    component: clothes_list_component_1.ClothesListComponent
                }
            ];
            exports_1("AppRoutingProviders", AppRoutingProviders = []);
            exports_1("AppRouting", AppRouting = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
