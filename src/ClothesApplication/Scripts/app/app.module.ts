///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { AppRouting } from './app-routing';
import { AuthService } from './auth.service';
import { AuthHttp } from './auth.http';
import "rxjs/Rx";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from "./app.component";
import { ClothesListComponent } from "./clothes-list.component";
import { ClothesDetailViewComponent } from "./clothes-detail-view.component";
import { ClothesDetailEditComponent } from "./clothes-detail-edit.component";
import { ClothesGridComponent } from "./clothes-grid.component";
import { LogItemComponent } from "./log-item.component";
import { HomeComponent } from "./home.component";
import { ViewHistoryComponent } from './view-history.component';
import { FilteredHistoryComponent } from './filtered-history.component';
import { UploadComponent } from './upload.component';
import { ClothesService } from "./clothes.service";
import { HistoryService } from "./history.service";
import { PagerService } from "./pager.service";
import { TransformCategoryPipe } from "./clothes-pipe";
import { TransformDatePipe } from "./clothes-pipe";

@NgModule({
    declarations: [AppComponent, ClothesListComponent, ClothesDetailViewComponent,
        ClothesDetailEditComponent, ClothesGridComponent, HomeComponent, LogItemComponent,
        ViewHistoryComponent, FilteredHistoryComponent, UploadComponent, TransformCategoryPipe, TransformDatePipe],
    imports: [BrowserModule, HttpModule, AppRouting,FormsModule,ReactiveFormsModule,RouterModule],
    providers: [ClothesService,HistoryService,PagerService,AuthService,AuthHttp],
    bootstrap : [ AppComponent ]
})

export class AppModule { }