import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClothesListComponent } from './clothes-list.component';
import { ClothesDetailComponent } from './clothes-detail.component';

const appRoutes: Routes = [
    {
        path: "clothesItem/:id",
        component: ClothesDetailComponent
    },
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