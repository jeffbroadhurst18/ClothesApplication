﻿import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; 

@Component({
    selector: 'clothes',
    template: 
    `<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <input type="checkbox" id="navbar-toggle-cbox">
        <div class="navbar-header">
            <label for="navbar-toggle-cbox" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </label>
            <a class="navbar-brand" href="javascript:void(0)">
                <img alt="logo" src="/img/logo.svg" />
            </a>
        </div>
        <div class="collapse navbar-collapse" id="navbar">
            <ul class="nav navbar-nav">
                <li [class.active]="isActive([''])">
                    <a class="home" [routerLink]="['']">Home</a>
                </li>
                <li [class.active]="isActive(['clothesItem/edit',0])" *ngIf="authService.isLoggedIn()">
                    <a class="add" [routerLink]="['clothesItem/edit', 0]">Add new item</a>
                </li>
                <li [class.active]="isActive(['logItem'])" *ngIf="authService.isLoggedIn()">
                    <a class="log" [routerLink]="['logItem']">Add Log</a>
                </li>
                <li [class.active]="isActive(['history'])">
                    <a class="history" [routerLink]="['history']">View History</a>
                </li>
                <li *ngIf="!authService.isLoggedIn()" [class.active]="isActive(['login'])">
                    <a class="login" [routerLink]="['login']">Login</a>
                </li>
                <li *ngIf="authService.isLoggedIn()">
                    <a class="logout" href="javascript:void(0)" (click)="logout()">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<h1 class="header">{{title}}</h1>
<div class="main-container">
    <router-outlet></router-outlet>
</div>`




})

export class AppComponent {
    title = 'Rebecca Clothes Program';

    constructor(public router: Router, public authService:AuthService) {}
    
    isActive(data: any[]) : boolean {
        return this.router.isActive(this.router.createUrlTree(data), true);
    }

    logout(): boolean {
        if (this.authService.logout()) {
            this.router.navigate([""]);
        }
        return false;
    }

}