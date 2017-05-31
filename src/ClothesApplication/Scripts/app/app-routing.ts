import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ClothesListComponent } from './clothes-list.component';
import { ClothesDetailViewComponent } from './clothes-detail-view.component';
import { ClothesDetailEditComponent } from './clothes-detail-edit.component';
import { LogItemComponent } from './log-item.component';
import { HomeComponent } from './home.component';
import { ViewHistoryComponent } from './view-history.component';
import { UploadComponent } from './upload.component';

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
    {
        path: "logItem",
        component: LogItemComponent
    },
    {
        path: "history",
        component: ViewHistoryComponent
    },
    {
        path: "upload",
        component: UploadComponent
    },
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);