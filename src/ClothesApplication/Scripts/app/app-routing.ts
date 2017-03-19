import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClothesListComponent } from './clothes-list.component';

const appRoutes: Routes = [
    {
        path: "",
        component: ClothesListComponent
    },
    {
        path: "clothes-list",
        component: ClothesListComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);