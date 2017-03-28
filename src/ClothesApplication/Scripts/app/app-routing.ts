import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClothesListComponent } from './clothes-list.component';
import { ClothesDetailViewComponent } from './clothes-detail-view.component';
import { ClothesDetailEditComponent } from './clothes-detail-edit.component';

const appRoutes: Routes = [
    {
        path: "clothesItem/edit/:id",
        component: ClothesDetailEditComponent
    },
    {
        path: "clothesItem/view/:id",
        component: ClothesDetailViewComponent
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