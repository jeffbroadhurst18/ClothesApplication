import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClothesListComponent } from './clothes-list.component';
import { ClothesDetailViewComponent } from './clothes-detail-view.component';
import { ClothesDetailEditComponent } from './clothes-detail-edit.component';
import { HomeComponent } from './home.component';

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "clothesItem/edit/:id",
        component: ClothesDetailEditComponent
    },
    {
        path: "clothesItem/view/:id",
        component: ClothesDetailViewComponent
    },
   
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);