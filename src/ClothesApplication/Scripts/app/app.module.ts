///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { AppRouting } from './app-routing';
import "rxjs/Rx";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from "./app.component";
import { ClothesListComponent } from "./clothes-list.component";
import { ClothesDetailViewComponent } from "./clothes-detail-view.component";
import { ClothesDetailEditComponent } from "./clothes-detail-edit.component";
import { HomeComponent } from "./home.component";
import { ClothesService } from "./clothes.service";
import { TransformCategoryPipe } from "./clothes-pipe";

@NgModule({
    declarations: [AppComponent, ClothesListComponent, ClothesDetailViewComponent, ClothesDetailEditComponent,HomeComponent,TransformCategoryPipe],
    imports: [BrowserModule, HttpModule, AppRouting,FormsModule,ReactiveFormsModule,RouterModule],
    providers: [ClothesService],
    bootstrap : [ AppComponent ]
})

export class AppModule { }