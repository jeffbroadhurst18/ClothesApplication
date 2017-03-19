import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'clothes',
    template: `<h1>{{title}}
    <nav>
    <a routerLink="clothes-list" routerLinkActive="active">Clothes List</a>
    </nav>
    </h1><router-outlet></router-outlet>`
})

export class AppComponent {
    title = 'Rebecca Clothes Program';
}