import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'clothes',
    template: `<h1>{{title}}
    <nav>
    <div class="menu">
        <a class="clothes" [routerLink]="['']">Clothes</a>
      | <a class="add" [routerLink]="['clothesItem', 0]">Add New</a>
    </div>
    <router-outlet></router-outlet>`
})

export class AppComponent {
    title = 'Rebecca Clothes Program';
}