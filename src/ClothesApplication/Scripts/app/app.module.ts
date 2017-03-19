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
import { ClothesDetailComponent } from "./clothes-detail.component";
import { ClothesService } from "./clothes.service";

@NgModule({
    declarations: [AppComponent,ClothesListComponent,ClothesDetailComponent],
    imports: [BrowserModule, HttpModule, AppRouting,FormsModule,ReactiveFormsModule,RouterModule],
    providers: [ClothesService],
    bootstrap : [ AppComponent ]
})

export class AppModule { }